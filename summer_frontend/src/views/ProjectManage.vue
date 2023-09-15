<template>
    <el-container>
        <el-header>
            <Header style="z-index: inherit;"></Header>
        </el-header>
        <el-aside>
        </el-aside>
        <el-main>
            <el-row :gutter="18">
                <el-col :span="3">
                    <div
                        style="font-style: normal; font-weight: bold; font-size: 30px; line-height: 28px; color: rgb(53, 68, 94); margin-bottom: 16px;">
                        个人空间</div>
                </el-col>
                <el-col :span="8" :offset="8"><el-input placeholder="请输入内容" v-model="inputProject"
                        style="font-size: medium; margin-top: 3px;">
                        <i slot="suffix" class="el-input__icon el-icon-search" @click="search"></i>
                    </el-input></el-col>
                <el-col :span="2"><el-button type="danger" icon="el-icon-plus" @click="dialogFormVisible = true"
                        size="medium">新建项目</el-button></el-col>
                <el-col :span="3"><el-button plain style="border: none;" icon="el-icon-view" size="medium"
                        @click="dialogFormVisibleMember = true">邀请新成员加入团队</el-button></el-col>
            </el-row>
            <el-tabs v-model="activeName" @tab-click="getDetail">
                <el-tab-pane label="全部项目" name="first">
                    <ProjectListAll :tableData="tableDataAll"></ProjectListAll>
                </el-tab-pane>
                <el-tab-pane label="我创建的" name="second">
                    <ProjectListOwn :tableData="tableDataOwn"></ProjectListOwn>
                </el-tab-pane>
                <el-tab-pane label="已收藏的" name="third">
                    <ProjectListCollected :tableData="tableDataCollected"></ProjectListCollected>
                </el-tab-pane>
                <el-tab-pane label="回收站" name="fourth">
                    <ProjectListDeleted :tableData="tableDataDeleted"></ProjectListDeleted>
                </el-tab-pane>
            </el-tabs>
            <el-dialog title="项目配置" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="项目名称" :label-width="formLabelWidth">
                        <el-input v-model="form.name" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="setDesign">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="邀请新成员" :visible.sync="dialogFormVisibleMember">
                <el-form :model="formMember">
                    <el-form-item label="搜索成员信息" :label-width="formLabelWidth">
                        <el-input v-model="search_member" auto-complete="off">
                            <i slot="suffix" class="el-input__icon el-icon-search" @click="searchMember"></i>
                        </el-input>
                    </el-form-item>
                    <el-table :data="searchData" style="width: 100%" size="medium" @cell-mouse-enter="handleRowMouseEnter"
                        @cell-mouse-leave="handleRowMouseLeave" v-if="showMemberTable === true">
                        <el-table-column prop="nickname" label="用户昵称" sortable width="180">
                        </el-table-column>
                        <el-table-column prop="realname" label="用户真实姓名" sortable width="180">
                        </el-table-column>
                        <el-table-column prop="email" label="用户email" sortable width="240">
                        </el-table-column>
                        <el-table-column label="" width="120">
                            <template slot-scope="scope">
                                <el-button v-if="scope.row.hover" round @click="sendInvitation(scope.row.id)"
                                    style="float: left; border: none; margin-top: 2px;" size="medium">
                                    邀请
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisibleMember = false">关 闭</el-button>
                </div>
            </el-dialog>
        </el-main>
    </el-container>
</template>

<script>
import ProjectListAll from '@/components/ProjectListAll.vue';
import ProjectListCollected from '@/components/ProjectListCollected.vue';
import ProjectListDeleted from '@/components/ProjectListDeleted.vue'
import ProjectListOwn from '@/components/ProjectListOwn.vue'
import Header from '@/components/HeaderComponent.vue'
import axios from 'axios'
import qs from "qs"
export default {
    data() {
        return {
            showMemberTable: false,
            search_member: '',
            inputProject: '',
            isReloadData: true,
            date: '',
            activeName: 'first',
            tableDataAll: [],
            tableDataCollected: [],
            tableDataDeleted: [],
            tableDataOwn: [],
            searchData: [],
            dialogFormVisible: false,
            dialogFormVisibleMember: false,
            form: {
                name: ''
            },
            formMember: {
                id: ''
            },
            formLabelWidth: '120px',
            optionsType: [{
                value: 'prototype',
                label: '原型'
            }, {
                value: 'cooperation',
                label: '协同'
            }],
            optionsLimits: [{
                value: 'own',
                label: '私有'
            }, {
                value: 'all',
                label: '团队'
            }],
        }
    },
    components: { ProjectListAll, ProjectListCollected, ProjectListDeleted, ProjectListOwn, Header },
    created() {
        this.getDetail();
    },
    methods: {
        handleRowMouseEnter(row, column, event) {
            row.hover = true;
        },
        handleRowMouseLeave(row, column, event) {
            row.hover = false;
        },
        searchMember() {
            let formData = new FormData();
            formData.append('info', this.search_member);
            axios.post('http://43.143.140.26/api/user/search', formData)
                .then(res => {              /* res 是 response 的缩写 */
                    switch (res.data.errno) {
                        case 0: {
                            console.log(res.data)
                            this.searchData = res.data.search_list;
                            this.showMemberTable = true;
                            break;
                        }
                        default: {
                            this.$message.warning("搜索失败！");
                            break;
                        }
                    }
                })
                .catch(err => {
                    console.log(err);         /* 若出现异常则在终端输出相关信息 */
                })
        },
        search() {
            if (this.inputProject === '') {
                this.getDetail();
            } else {
                axios.get('http://43.143.140.26/api/project/search', {
                    params: {
                        id: this.$route.params.userID,
                        team_id: this.$route.params.teamID,
                        search_str: this.inputProject,
                        rank: 1
                    }
                })
                    .then(res => {              /* res 是 response 的缩写 */
                        switch (res.data.errno) {
                            case 0: {
                                console.log(res.data)
                                this.tableDataAll = res.data.project_list;

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

                axios.get('http://43.143.140.26/api/project/search', {
                    params: {
                        id: this.$route.params.userID,
                        team_id: this.$route.params.teamID,
                        search_str: this.inputProject,
                        rank: 2
                    }
                })
                    .then(res => {              /* res 是 response 的缩写 */
                        switch (res.data.errno) {
                            case 0: {
                                console.log(res.data)
                                this.tableDataOwn = res.data.project_list;

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

                axios.get('http://43.143.140.26/api/project/search', {
                    params: {
                        id: this.$route.params.userID,
                        team_id: this.$route.params.teamID,
                        search_str: this.inputProject,
                        rank: 3
                    }
                })
                    .then(res => {              /* res 是 response 的缩写 */
                        switch (res.data.errno) {
                            case 0: {
                                console.log(res.data)
                                this.tableDataCollected = res.data.project_list;

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

                axios.get('http://43.143.140.26/api/project/search', {
                    params: {
                        id: this.$route.params.userID,
                        team_id: this.$route.params.teamID,
                        search_str: this.inputProject,
                        rank: 4
                    }
                })
                    .then(res => {              /* res 是 response 的缩写 */
                        switch (res.data.errno) {
                            case 0: {
                                console.log('binlist' + res.data.project_list)
                                this.tableDataDeleted = res.data.project_list;

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
        },
        sendInvitation(id) {
            const formData = new FormData();
            formData.append("id_1", this.$route.params.userID);
            formData.append("id_2", id);
            formData.append("team_id", this.$route.params.teamID);
            axios.post('http://43.143.140.26/api/team/invite', formData, {
            }).then((response) => {
                this.dialogFormVisibleMember = false;
                this.formMember.id = '';
                this.showMemberTable = false,
                    this.search_member = '',
                    console.log('成功响应:', response.data);
            }).catch(function (error) {
                console.error('请求出错:', error);
            })
        },
        getDetail() {
            axios.get('http://43.143.140.26/api/project/list', {
                params: {
                    team_id: this.$route.params.teamID
                }
            })
                .then(res => {              /* res 是 response 的缩写 */
                    switch (res.data.errno) {
                        case 0: {
                            console.log(res.data)
                            this.tableDataAll = res.data.project_list;

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

            axios.get('http://43.143.140.26/api/project/ownlist', {
                params: {
                    id: this.$route.params.userID,
                    team_id: this.$route.params.teamID
                }
            })
                .then(res => {              /* res 是 response 的缩写 */
                    switch (res.data.errno) {
                        case 0: {
                            console.log(res.data)
                            this.tableDataOwn = res.data.project_list;

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
                            this.tableDataCollected = res.data.project_list;

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

            axios.get('http://43.143.140.26/api/project/binlist', {
                params: {
                    team_id: this.$route.params.teamID
                }
            })
                .then(res => {              /* res 是 response 的缩写 */
                    switch (res.data.errno) {
                        case 0: {
                            console.log('binlist' + res.data.project_list)
                            this.tableDataDeleted = res.data.project_list;
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
        },
        currentTime() {
            var date = new Date();
            var year = date.getFullYear(); //月份从0~11，所以加一
            let month = date.getMonth();
            console.log("month", month);
            var dateArr = [
                date.getMonth() + 1,
                date.getDate(),
                date.getHours(),
                date.getMinutes(),
                date.getSeconds(),
            ];
            //如果格式是MM则需要此步骤，如果是M格式则此循环注释掉
            for (var i = 0; i < dateArr.length; i++) {
                if (dateArr[i] >= 1 && dateArr[i] <= 9) {
                    dateArr[i] = "0" + dateArr[i];
                }
            }
            var strDate =
                year +
                "-" +
                dateArr[0] +
                "-" +
                dateArr[1] +
                " " +
                dateArr[2] +
                ":" +
                dateArr[3] +
                ":" +
                dateArr[4];
            this.date = strDate;
        },
        setDesign() {
            let formData = new FormData();
            formData.append('id', this.$route.params.userID);
            formData.append('team_id', this.$route.params.teamID);
            formData.append('project_name', this.form.name);
            this.dialogFormVisible = false;
            axios.post('http://43.143.140.26/api/project/create', formData, {
                headers: { "content-type": "application/x-www-form-urlencoded" },
            })
                .then(res => {              /* res 是 response 的缩写 */
                    switch (res.data.errno) {
                        case 0: {
                            this.$message.success("新建项目成功！");
                            let projectID = res.data.id;
                            this.$router.push("/project/" + projectID);
                            break;
                        }
                        default: {
                            this.$message.warning("新建项目失败！");
                            break;
                        }
                    }
                })
                .catch(err => {
                    console.log(err);         /* 若出现异常则在终端输出相关信息 */
                })
        }
    }
}
</script>

<style></style>
