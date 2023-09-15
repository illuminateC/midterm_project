<template>
    <div>
        <el-button round @click="changeShowType" style="float: right; border: none; margin-top: 10px;" size="medium"
            v-if="showType === 'table'">平铺模式</el-button>
        <el-button round @click="changeShowType" style="float: right; border: none; margin-top: 10px;" size="medium"
            v-if="showType === 'card'">列表模式</el-button>
        <el-button round @click="changeSelectType" style="float: right; border: none; margin-top: 10px;" size="medium"
            v-if="showType === 'table'">批量操作</el-button>
        <el-button round @click="deleteSelectItem" style="float: left; border: none; margin-top: 10px;"
            v-if="selectType === 'selection'" size="medium">彻底删除</el-button>
        <el-button round @click="recoverSelectItem" style="float: left; border: none; margin-top: 10px;"
            v-if="selectType === 'selection'" size="medium">恢复项目</el-button>
        <div v-if="showType === 'table'" class="table-container">
            <el-table height="500" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange"
                size="medium" @filter-change="handleFilterChange">
                <el-table-column type="selection" width="55" v-if="selectType === 'selection'">
                </el-table-column>
                <el-table-column prop="project_name" label="名称" sortable :width="name_width">
                </el-table-column>
                <!-- <el-table-column prop="type" label="设计稿类型" width="150"
                    :filters="[{ text: '原型', value: '原型' }, { text: '协作', value: '协作' }, { text: '流程图', value: '流程图' }, { text: '思维导图', value: '思维导图' }]"
                    :filter-method="filterTag" filter-placement="bottom-end">
                </el-table-column> -->
                <el-table-column prop="creator_nickname" label="作者" width="150">
                </el-table-column>
                <!-- <el-table-column prop="projectType" label="项目类型" width="150">
                </el-table-column> -->
                <el-table-column prop="created_time" label="创建时间" sortable width="150">
                </el-table-column>
                <el-table-column prop="deleted_time" label="删除时间" sortable width="150">
                </el-table-column>
                <el-table-column prop="expiration_time" label="到期时间" sortable width="150">
                </el-table-column>
                <el-table-column prop="finished" label="项目状态" width="150"
                    :filters="[{ text: '已归档', value: '已归档' }, { text: '未归档', value: '未归档' }]" :filter-method="filterTag"
                    filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.finished === '已归档' ? 'primary' : 'success'" close-transition>{{
                            scope.row.finished
                        }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="finished_time" label="归档时间" sortable width="180" v-if="showFinishedTime === true">
                </el-table-column>
            </el-table>
        </div>
        <div class="container" v-if="showType === 'card'">
            <div style="width: 100%; flex-wrap: wrap; display: flex;">
                <div class="docment-container" v-for="table in tableData" style="display: inline-block;">
                    <div class="document" @mouseover="hover = true" @mouseleave="hover = false">
                        <div class="layer layer11111" :class="{ hidden: !hover }">
                            <i class="el-icon-download" @click="recoverDocument(table.project_id)"></i>
                            <i class="el-icon-delete" @click="deleteDocument(table.project_id)"></i>
                        </div>
                        <div class="layer layer22222"></div>
                    </div>
                    <div class="message-container">
                        <div class="message">{{ table.project_name }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: {
        tableData: {
            type: Array,
            default() {
                return [
                ]
            }
        }
    },
    data() {
        return {
            name_width: 640,
            showFinishedTime: false,
            selectType: '',
            multipleSelection: [],
            showType: 'table'
        }
    },
    methods: {
        handleFilterChange(filters) {
            console.log("filters" + JSON.stringify(filters));
            const columnKey = 'el-table_4_column_17'; // Replace this with your actual columnKey
            const selectedFilters = filters[columnKey];

            if (selectedFilters && selectedFilters.includes('已归档') && !selectedFilters.includes('未归档')) {
                this.showFinishedTime = true;
                this.name_width = 460;
            } else {
                this.showFinishedTime = false;
                this.name_width = 640;
            }
        },
        recoverDocument(a) {
            let formData = new FormData();
            formData.append('project_id', a);
            axios.post('http://43.143.140.26/api/project/recover', formData, {
                headers: { "content-type": "application/x-www-form-urlencoded" },
            })
                .then(res => {              /* res 是 response 的缩写 */
                    switch (res.data.errno) {
                        case 0: {
                            axios.get('http://43.143.140.26/api/project/binlist', {
                                params: {
                                    team_id: this.$route.params.teamID
                                }
                            })
                                .then(res => {              /* res 是 response 的缩写 */
                                    switch (res.data.errno) {
                                        case 0: {
                                            console.log('binlist' + res.data.project_list)
                                            this.tableData = res.data.project_list;
                                            break;
                                        }
                                        default: {
                                            this.$message.warning("失败！");
                                            break;
                                        }
                                    }
                                })
                                .catch(err => {
                                    console.log(err);         /* 若出现异常则在终端输出相关信息 */
                                })
                            this.$message.success("恢复项目成功！");
                            break;
                        }
                        default: {
                            this.$message.warning("恢复项目失败！");
                            break;
                        }
                    }
                })
                .catch(err => {
                    console.log(err);         /* 若出现异常则在终端输出相关信息 */
                })
        },
        deleteDocument(a) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    let formData = new FormData();
                    formData.append('project_id', a);
                    console.log("value.project_id", a);
                    axios.post('http://43.143.140.26/api/project/deleteagain', formData, {
                        headers: { "content-type": "application/x-www-form-urlencoded" },
                    })
                        .then(res => {              /* res 是 response 的缩写 */
                            switch (res.data.errno) {
                                case 0: {
                                    axios.get('http://43.143.140.26/api/project/binlist', {
                                        params: {
                                            team_id: this.$route.params.teamID
                                        }
                                    })
                                        .then(res => {              /* res 是 response 的缩写 */
                                            switch (res.data.errno) {
                                                case 0: {
                                                    console.log('binlist' + res.data.project_list)
                                                    this.tableData = res.data.project_list;
                                                    break;
                                                }
                                                default: {
                                                    this.$message.warning("失败！");
                                                    break;
                                                }
                                            }
                                        })
                                        .catch(err => {
                                            console.log(err);         /* 若出现异常则在终端输出相关信息 */
                                        })
                                    this.$message.success("删除项目成功！");
                                    break;
                                }
                                default: {
                                    this.$message.warning("删除项目失败！");
                                    break;
                                }
                            }
                        })
                        .catch(err => {
                            console.log(err);         /* 若出现异常则在终端输出相关信息 */
                        })


                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        filterTag(value, row) {
            return row.finished === value;
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        deleteSelectItem() {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    //遍历获得多选选中的index值
                    this.multipleSelection.forEach((value, index) => {
                        //遍历多选框获取的数据
                        this.tableData.forEach((v, i) => {
                            //遍历数据表，任意一个属性值相同，则说明该数据被选中，其i则为索引值
                            if (value.project_name == v.project_name) {
                                let formData = new FormData();
                                formData.append('project_id', value.project_id);
                                console.log("value.project_id", value.project_id);
                                axios.post('http://43.143.140.26/api/project/deleteagain', formData, {
                                    headers: { "content-type": "application/x-www-form-urlencoded" },
                                })
                                    .then(res => {              /* res 是 response 的缩写 */
                                        switch (res.data.errno) {
                                            case 0: {
                                                axios.get('http://43.143.140.26/api/project/binlist', {
                                                    params: {
                                                        team_id: this.$route.params.teamID
                                                    }
                                                })
                                                    .then(res => {              /* res 是 response 的缩写 */
                                                        switch (res.data.errno) {
                                                            case 0: {
                                                                console.log('binlist' + res.data.project_list)
                                                                this.tableData = res.data.project_list;
                                                                break;
                                                            }
                                                            default: {
                                                                this.$message.warning("失败！");
                                                                break;
                                                            }
                                                        }
                                                    })
                                                    .catch(err => {
                                                        console.log(err);         /* 若出现异常则在终端输出相关信息 */
                                                    })
                                                this.$message.success("删除项目成功！");
                                                break;
                                            }
                                            default: {
                                                this.$message.warning("删除项目失败！");
                                                break;
                                            }
                                        }
                                    })
                                    .catch(err => {
                                        console.log(err);         /* 若出现异常则在终端输出相关信息 */
                                    })
                            }
                        });
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        recoverSelectItem() {
            this.multipleSelection.forEach((value, index) => {
                //遍历多选框获取的数据
                this.tableData.forEach((v, i) => {
                    //遍历数据表，任意一个属性值相同，则说明该数据被选中，其i则为索引值
                    if (value.project_name == v.project_name) {
                        let formData = new FormData();
                        formData.append('project_id', value.project_id);
                        console.log(value.project_id);
                        axios.post('http://43.143.140.26/api/project/recover', formData, {
                            headers: { "content-type": "application/x-www-form-urlencoded" },
                        })
                            .then(res => {              /* res 是 response 的缩写 */
                                switch (res.data.errno) {
                                    case 0: {
                                        axios.get('http://43.143.140.26/api/project/binlist', {
                                            params: {
                                                team_id: this.$route.params.teamID
                                            }
                                        })
                                            .then(res => {              /* res 是 response 的缩写 */
                                                switch (res.data.errno) {
                                                    case 0: {
                                                        console.log('binlist' + res.data.project_list)
                                                        this.tableData = res.data.project_list;
                                                        break;
                                                    }
                                                    default: {
                                                        this.$message.warning("失败！");
                                                        break;
                                                    }
                                                }
                                            })
                                            .catch(err => {
                                                console.log(err);         /* 若出现异常则在终端输出相关信息 */
                                            })
                                        this.$message.success("恢复项目成功！");
                                        break;
                                    }
                                    default: {
                                        this.$message.warning("恢复项目失败！");
                                        break;
                                    }
                                }
                            })
                            .catch(err => {
                                console.log(err);         /* 若出现异常则在终端输出相关信息 */
                            })


                    }
                });
            });
        },
        changeSelectType() {
            if (this.selectType === 'selection') {
                this.selectType = '';
            } else {
                this.selectType = 'selection';
            }
        },
        changeShowType() {
            this.selectType = '';
            if (this.showType === 'table') {
                this.showType = 'card';
            } else {
                this.showType = 'table';
            }
        }
    },
    mounted() {
        document.querySelector('body').setAttribute('style', 'overflow: auto;');
    }
}
</script>

<style>
.docment-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    /* 减小相邻元素之间的间距 */
    width: 100px;
    margin: 10px 20px 0px 20px;
}

.docment-container2 {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    /* 减小相邻元素之间的间距 */
    width: 100px;
    margin: 10px 20px 0px 20px;
}

.document {
    position: relative;
    width: 100px;
    height: 100px;
}

.layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity 0.3s ease;
}

.layer11111 {
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 1;
    z-index: 2;
    /* 设置较高的 z-index 值 */
}

.layer11111 i {
    margin: 0 10px;
}

.layer22222 {
    background-color: rgba(0, 0, 0, 0);
    opacity: 1;
    background-image: url('../assets/background/BG16.webp');
    background-size: cover;
    /* 添加背景图片填充容器的样式 */
    background-position: center;
    /* 添加背景图片居中对齐的样式 */
}

.hidden {
    visibility: hidden;
}

.document:hover .layer11111 {
    visibility: visible;
}

.document:hover .layer22222 {
    opacity: 0.3;
}

.document:hover .layer3 {
    opacity: 0.7;
}

.message-container {
    margin-top: 10px;
    /* 减小上方的垂直间距 */
    width: 100%;
}

.message {
    text-align: center;
    font-size: 18px;
    height: 50px;
}

.container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
    /* 添加滚动条，当内容溢出时 */

}

.table-container {
    max-height: 500px;
    /* 设置最大高度，可以根据需要调整 */
    overflow-y: auto;
    /* 允许垂直滚动 */
    width: 100%;
}</style>