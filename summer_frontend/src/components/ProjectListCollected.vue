<template>
    <div>
        <el-button round @click="changeShowType" style="float: right; border: none; margin-top: 10px;" size="medium"
            v-if="showType === 'table'">平铺模式</el-button>
        <el-button round @click="changeShowType" style="float: right; border: none; margin-top: 10px;" size="medium"
            v-if="showType === 'card'">列表模式</el-button>
        <el-button round @click="changeSelectType" style="float: right; border: none; margin-top: 10px;" size="medium"
            v-if="showType === 'table'">批量操作</el-button>
        <el-button round @click="deleteSelectItem" style="float: left; border: none; margin-top: 10px;"
            v-if="selectType === 'selection'" size="medium">删除</el-button>
        <el-button round @click="discollectSelectItem" style="float: left; border: none; margin-top: 10px;"
            v-if="selectType === 'selection'" size="medium">取消收藏</el-button>
        <el-button round @click="finishSelectItem" style="float: left; border: none; margin-top: 10px;"
            v-if="selectType === 'selection'" size="medium">归档</el-button>
        <div v-if="showType === 'table'" class="table-container">
            <el-table height="500" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange"
                size="medium" @filter-change="handleFilterChange" @cell-mouse-enter="handleRowMouseEnter"
                @cell-mouse-leave="handleRowMouseLeave">
                <el-table-column type="selection" width="55" v-if="selectType === 'selection'">
                </el-table-column>
                <el-table-column prop="project_name" label="名称" sortable :width="name_width">
                    <template slot-scope="scope">
                        <div v-if="!scope.row.isEditing" @dblclick="startEditing(scope.row)">
                            <router-link :to="checkRouterLink(scope.row.project_id)"
                                style="text-decoration: none; color: #333; font-family:sans-serif;">{{
                                    scope.row.project_name
                                }}</router-link>
                        </div>
                        <div v-else>
                            <el-input v-model="scope.row.newName" @blur="finishEditing(scope.row)" autofocus></el-input>
                        </div>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="type" label="设计稿类型" width="180"
                    :filters="[{ text: '原型', value: '原型' }, { text: '协作', value: '协作' }, { text: '流程图', value: '流程图' }, { text: '思维导图', value: '思维导图' }]"
                    :filter-method="filterTag" filter-placement="bottom-end">
                </el-table-column> -->
                <el-table-column prop="creator_nickname" label="作者" width="180">
                </el-table-column>
                <!-- <el-table-column prop="projectType" label="项目类型" width="180">
                </el-table-column> -->
                <el-table-column prop="created_time" label="创建时间" sortable width="180">
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
                <el-table-column label="" width="80">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.hover" round @click="copySelectItem(scope.row.project_id)"
                            style="float: left; border: none; margin-top: 2px;" size="medium">
                            复制
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="container" v-if="showType === 'card'">
            <div style="width: 100%; flex-wrap: wrap; display: flex;">
                <div class="docment-container" v-for="table in tableData" style="display: inline-block;">
                    <div class="document" @mouseover="hover = true" @mouseleave="hover = false">
                        <div class="layer layer1111" :class="{ hidden: !hover }">
                            <div class="icon-row">
                                <i class="el-icon-edit" @click="editDocument(table.project_id)"></i>
                                <i class="el-icon-star-on" @click="discollectDocument(table.project_id)"></i>
                            </div>
                            <div class="icon-row">
                                <i class="el-icon-circle-check" @click="finishDocument(table.project_id)"
                                    v-if="table.finished === '未归档'"></i>
                                <i class="el-icon-delete" @click="deleteDocument(table.project_id)"></i>
                                <i class="el-icon-document-copy" @click="copyDocument(table.project_id)"></i>
                            </div>
                        </div>
                        <div class="layer layer2222"></div>
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
import axios from 'axios'
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
            name_width: 880,
            showFinishedTime: false,
            selectType: '',
            multipleSelection: [],
            showType: 'table'
        }
    },
    methods: {
        handleRowMouseEnter(row, column, event) {
            row.hover = true;
        },
        handleRowMouseLeave(row, column, event) {
            row.hover = false;
        },
        handleFilterChange(filters) {
            console.log("filters" + JSON.stringify(filters));
            const columnKey = 'el-table_3_column_11'; // Replace this with your actual columnKey
            const selectedFilters = filters[columnKey];

            if (selectedFilters && selectedFilters.includes('已归档') && !selectedFilters.includes('未归档')) {
                this.showFinishedTime = true;
                this.name_width = 700;
            } else {
                this.showFinishedTime = false;
                this.name_width = 880;
            }
        },
        editDocument(a) {
            this.$router.push('/project/' + a)
        },
        deleteDocument(a) {
            this.$confirm("此操作将删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    let formData = new FormData();
                    formData.append('id', this.$route.params.userID);
                    formData.append('team_id', this.$route.params.teamID);
                    formData.append('project_id', a);
                    console.log("this.$route.params.userID" + this.$route.params.userID);
                    console.log("this.$route.params.teamID" + this.$route.params.teamID);
                    console.log("value.project_id", a);
                    axios.post('http://43.143.140.26/api/project/delete', formData, {
                        headers: { "content-type": "application/x-www-form-urlencoded" },
                    })
                        .then(res => {              /* res 是 response 的缩写 */
                            switch (res.data.errno) {
                                case 0: {
                                    axios.get('http://43.143.140.26/api/project/collectlist', {
                                        params: {
                                            id: this.$route.params.userID,
                                            team_id: this.$route.params.teamID
                                        }
                                    })
                                        .then(res => {              /* res 是 response 的缩写 */
                                            switch (res.data.errno) {
                                                case 0: {
                                                    console.log(res.data)
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
        discollectDocument(a) {
            let formData = new FormData();
            formData.append('id', this.$route.params.userID);
            formData.append('team_id', this.$route.params.teamID);
            formData.append('project_id', a);
            axios.post('http://43.143.140.26/api/project/discollect', formData, {
                headers: { "content-type": "application/x-www-form-urlencoded" },
            })
                .then(res => {              /* res 是 response 的缩写 */
                    switch (res.data.errno) {
                        case 0: {
                            axios.get('http://43.143.140.26/api/project/collectlist', {
                                params: {
                                    id: this.$route.params.userID,
                                    team_id: this.$route.params.teamID
                                }
                            })
                                .then(res => {              /* res 是 response 的缩写 */
                                    switch (res.data.errno) {
                                        case 0: {
                                            console.log(res.data)
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
                            this.$message.success("取消收藏项目成功！");
                            break;
                        }
                        default: {
                            this.$message.warning("取消收藏项目失败！");
                            break;
                        }
                    }
                })
                .catch(err => {
                    console.log(err);         /* 若出现异常则在终端输出相关信息 */
                })
        },
        finishDocument(a) {
            let formData = new FormData();
            formData.append('project_id', a);
            axios.post('http://43.143.140.26/api/project/finish', formData, {
                headers: { "content-type": "application/x-www-form-urlencoded" },
            })
                .then(res => {              /* res 是 response 的缩写 */
                    switch (res.data.errno) {
                        case 0: {
                            axios.get('http://43.143.140.26/api/project/collectlist', {
                                params: {
                                    id: this.$route.params.userID,
                                    team_id: this.$route.params.teamID
                                }
                            })
                                .then(res => {              /* res 是 response 的缩写 */
                                    switch (res.data.errno) {
                                        case 0: {
                                            console.log(res.data)
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
                            this.$message.success("项目归档成功！");
                            break;
                        }
                        default: {
                            this.$message.warning("项目归档失败！");
                            break;
                        }
                    }
                })
                .catch(err => {
                    console.log(err);         /* 若出现异常则在终端输出相关信息 */
                })
        },
        copyDocument(a) {
            let formData = new FormData();
            formData.append('project_id', a);
            formData.append('team_id', this.$route.params.teamID);
            formData.append('id', this.$route.params.userID);
            axios.post('http://43.143.140.26/api/project/copy', formData, {
                headers: { "content-type": "application/x-www-form-urlencoded" },
            })
                .then(res => {              /* res 是 response 的缩写 */
                    switch (res.data.errno) {
                        case 0: {
                            axios.get('http://43.143.140.26/api/project/list', {
                                params: {
                                    team_id: this.$route.params.teamID
                                }
                            })
                                .then(res => {              /* res 是 response 的缩写 */
                                    switch (res.data.errno) {
                                        case 0: {
                                            console.log(res.data)
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
                            this.$router.push("/project/" + res.data.project_id);
                            this.$message.success("项目复制成功！");
                            break;
                        }
                        default: {
                            this.$message.warning("项目复制失败！");
                            break;
                        }
                    }
                })
                .catch(err => {
                    console.log(err);         /* 若出现异常则在终端输出相关信息 */
                })
        },
        deleteSelectItem() {
            this.$confirm("此操作将删除该文件, 是否继续?", "提示", {
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
                                formData.append('id', this.$route.params.userID);
                                formData.append('team_id', this.$route.params.teamID);
                                formData.append('project_id', value.project_id);
                                console.log("this.$route.params.userID" + this.$route.params.userID);
                                console.log("this.$route.params.teamID" + this.$route.params.teamID);
                                console.log("value.project_id", value.project_id);
                                axios.post('http://43.143.140.26/api/project/delete', formData, {
                                    headers: { "content-type": "application/x-www-form-urlencoded" },
                                })
                                    .then(res => {              /* res 是 response 的缩写 */
                                        switch (res.data.errno) {
                                            case 0: {
                                                axios.get('http://43.143.140.26/api/project/collectlist', {
                                                    params: {
                                                        id: this.$route.params.userID,
                                                        team_id: this.$route.params.teamID
                                                    }
                                                })
                                                    .then(res => {              /* res 是 response 的缩写 */
                                                        switch (res.data.errno) {
                                                            case 0: {
                                                                console.log(res.data)
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
        discollectSelectItem() {
            this.multipleSelection.forEach((value, index) => {
                let formData = new FormData();
                formData.append('id', this.$route.params.userID);
                formData.append('team_id', this.$route.params.teamID);
                formData.append('project_id', value.project_id);
                axios.post('http://43.143.140.26/api/project/discollect', formData, {
                    headers: { "content-type": "application/x-www-form-urlencoded" },
                })
                    .then(res => {              /* res 是 response 的缩写 */
                        switch (res.data.errno) {
                            case 0: {
                                axios.get('http://43.143.140.26/api/project/collectlist', {
                                    params: {
                                        id: this.$route.params.userID,
                                        team_id: this.$route.params.teamID
                                    }
                                })
                                    .then(res => {              /* res 是 response 的缩写 */
                                        switch (res.data.errno) {
                                            case 0: {
                                                console.log(res.data)
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
                                this.$message.success("取消收藏项目成功！");
                                break;
                            }
                            default: {
                                this.$message.warning("取消收藏项目失败！");
                                break;
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err);         /* 若出现异常则在终端输出相关信息 */
                    })
            });
        },
        finishSelectItem() {
            this.multipleSelection.forEach((value, index) => {
                let formData = new FormData();
                formData.append('project_id', value.project_id);
                axios.post('http://43.143.140.26/api/project/finish', formData, {
                    headers: { "content-type": "application/x-www-form-urlencoded" },
                })
                    .then(res => {              /* res 是 response 的缩写 */
                        switch (res.data.errno) {
                            case 0: {
                                axios.get('http://43.143.140.26/api/project/collectlist', {
                                    params: {
                                        id: this.$route.params.userID,
                                        team_id: this.$route.params.teamID
                                    }
                                })
                                    .then(res => {              /* res 是 response 的缩写 */
                                        switch (res.data.errno) {
                                            case 0: {
                                                console.log(res.data)
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
                                this.$message.success("项目归档成功！");
                                break;
                            }
                            default: {
                                this.$message.warning("项目归档失败！");
                                break;
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err);         /* 若出现异常则在终端输出相关信息 */
                    })
            });
        },
        copySelectItem(id) {
            let formData = new FormData();
            formData.append('project_id', id);
            formData.append('team_id', this.$route.params.teamID);
            formData.append('id', this.$route.params.userID);
            axios.post('http://43.143.140.26/api/project/copy', formData, {
                headers: { "content-type": "application/x-www-form-urlencoded" },
            })
                .then(res => {              /* res 是 response 的缩写 */
                    switch (res.data.errno) {
                        case 0: {
                            axios.get('http://43.143.140.26/api/project/list', {
                                params: {
                                    team_id: this.$route.params.teamID
                                }
                            })
                                .then(res => {              /* res 是 response 的缩写 */
                                    switch (res.data.errno) {
                                        case 0: {
                                            console.log(res.data)
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
                            this.$router.push("/project/" + res.data.project_id);
                            this.$message.success("项目复制成功！");
                            break;
                        }
                        default: {
                            this.$message.warning("项目复制失败！");
                            break;
                        }
                    }
                })
                .catch(err => {
                    console.log(err);         /* 若出现异常则在终端输出相关信息 */
                })
        },
        checkRouterLink(id) {
            return '/project/' + id;
        },
        filterTag(value, row) {
            return row.type === value;
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
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
        },
        startEditing(row) {
            row.isEditing = true;
            row.newName = row.name;
        },
        finishEditing(row) {
            if (row.newName.trim() !== '') {
                if (row.newName !== row.name) {
                    row.name = row.newName;
                    let name = row.newName;
                    let project_id = row.project_id;
                    let formData = new FormData();
                    formData.append('project_id', project_id);
                    formData.append('name', name);
                    console.log(row.project_id);
                    axios.post('http://43.143.140.26/api/project/rename', formData)
                        .then(res => {              /* res 是 response 的缩写 */
                            switch (res.data.errno) {
                                case 0: {
                                    axios.get('http://43.143.140.26/api/project/collectlist', {
                                        params: {
                                            id: this.$route.params.userID,
                                            team_id: this.$route.params.teamID
                                        }
                                    })
                                        .then(res => {              /* res 是 response 的缩写 */
                                            switch (res.data.errno) {
                                                case 0: {
                                                    console.log(res.data)
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
                                    this.$message.success("成功！");
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
                }
            } else {
                this.$message.warning("名称不能为空！");
            }
            row.isEditing = false;
        },
        filterTag(value, row) {
            return row.finished === value;
        },
    },
    mounted() {
        document.querySelector('body').setAttribute('style', 'overflow: auto;');
    }
}
</script>

<style>
.icon-row {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
}

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

.layer1111 {
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 1;
    z-index: 2;
    flex-direction: column;
    /* 设置较高的 z-index 值 */
}

.layer1111 i {
    margin: 0 10px;
}

.layer2222 {
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

.document:hover .layer1111 {
    visibility: visible;
}

.document:hover .layer2222 {
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
}
</style>