<template>
    <main style="background-color: #f2f2f2;width: 100%;height: 100%;padding: 110px 0;">
        <div class="login-box">
            <div class="logo-area">
                <h1 style="font-weight: 400;">金融港后台管理系统</h1>
            </div>
            <div class="login-area">
                <el-form>
                    <el-form-item label="账户">
                        <el-input v-model="user.username">
                            <i slot="prefix" class="el-input__icon iconfont icon-people"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input
                                v-model="user.password"
                                :type="pwdType"
                        >
                            <i slot="prefix" class="el-input__icon iconfont icon-unlock"></i>
                            <i slot="suffix" v-if="!showPwd" @mousedown="changePwd" @mouseup="changePwd" class="el-input__icon iconfont icon-attention_light"></i>
                            <i slot="suffix" v-else @mousedown="changePwd" @mouseup="changePwd" class="el-input__icon iconfont icon-attentionforbid"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="fluid-btn" size="small" @click="login" :loading="loading">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </main>
</template>

<script>
    export default {
        name: "Login",
        data:function () {
            return {
                user:{
                    username: '',
                    password: ''
                },
                loading:false,
                showPwd:false,
                pwdType:"password",

            }
        },
        methods:{
            login(){
                this.loading = true;
                if (!this.checkForm()){
                    this.loading = false;
                    return;
                }

              this.$sec.login(this.user.username, this.user.password)
                  .then(res => {
                    const fromPath = this.$route.params.from;
                    this.$http.get("/menus/tree/" + this.$sec.getAccountInfo().id).then(res => {
                      this.$store.commit("commitAdminMenus", res.data);
                      this.$router.push(fromPath);
                    }).catch(rej => {
                      this.loading = false;
                    });
                  }).catch(reg => {
                    this.loading = false;
              })
            },
            //显示与隐藏密码
            changePwd(){
                this.pwdType = this.showPwd? "password" : "text";
                this.showPwd = !this.showPwd;
            },
            //监听回车按钮
            keyDownHandler:function (event) {
                if (this.loading) {
                    return;
                }

                if (event.key && event.key.toLowerCase() === 'enter'){
                    this.login();
                }
            },
            //表单校验
            checkForm(){
                if (!this.user.username){
                    this.$message.warning("账号不能为空");
                    return false;
                }

                if (!this.user.password){
                    this.$message.warning("密码不能为空");
                    return false;
                }
                return true;
            }
        },
        mounted: function () {
            window.onkeydown = this.keyDownHandler;
        }
    }
</script>

<style scoped>

    .login-box{
        width: 20%;
        margin: 0 auto;
    }

    .logo-area{
        text-align: center;
    }

    .fluid-btn{
        width: 100%;
    }

    *{
        box-sizing: border-box;
    }

</style>
