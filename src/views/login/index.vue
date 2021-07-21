<template>
    <div class="login-container">
      <el-form :model="user"  :rules="rules" status-icon  ref="loginForm" class="login-form">
        <el-form-item >
           <img class="login-logo"/>
        </el-form-item>
        <el-form-item prop="mobile">
            <el-input
            icon="el-icon-mobile-phone"
            v-model="user.mobile"
            placeholder="请输入手机号">
            </el-input>
        </el-form-item>
        <el-form-item prop="code" >
            <el-input
            icon="el-icon-mobile-phone"
            v-model="user.code"
            placeholder="请输入验证码">
            </el-input>
        </el-form-item>
        <el-form-item prop="agree">
            <el-checkbox v-model="user.agree">我已阅读，并统一协议</el-checkbox>
        </el-form-item>
        <el-form-item>
            <el-button  type="primary" class="login-btn" @click="onLogin" :loading="loginLoading">登录</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  name: 'IndexLogin',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        agree: false // 同意协议
      },
      loginLoading: false,
      // checked: false, // 同意协议
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式' }
        ],
        agree: [
          {
            // 自定义校验规则
            // 校验通过： callback（）
            // 校验失败： callback（new Error('错误消息'))
            validator: (rule, value, callback) => {
              // console.log(rule, value)
              if (value) {
                callback()
              } else {
                callback(new Error('请勾选协议'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    onLogin () {
      // 获取表单数据（根据接口要求绑定数据）
      // const user = this.user

      // 表单验证
      this.$refs.loginForm.validate(valid => {
        // 如果表单验证失败
        if (!valid) {
          return
        }
        // 验证通过请求登录
        this.login()
      })
    },
    login () {
      // 验证通过，提交表单
      this.loginLoading = true
      login(this.user).then(res => {
        console.log(res)
        // 登录成功
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.loginLoading = false

        // 将接口返回的用户相关数据放到本地存储，方便应用共享数据
        // 本地存储只能存储字符串
        // 如果要存储对象、数组类型的数据，则把他们转为json字符串

        window.localStorage.setItem('user', JSON.stringify(res.data.data))
        // this.$router.push('/')
        // 或者路由有名字的可以这么跳转
        this.$router.push({
          name: 'home'
        })
      }).catch(err => {
        console.log(err)
        // 登录失败
        this.$message.error('登录失败')
        this.loginLoading = false
      })
      // 这部分封装到了api/user 里面的login方法里
      // request({
      //   methods: 'POST',
      //   url: '/mp/v1_0/authorizations',
      //   // data用来设置POST请求体
      //   data: this.user
      // })
    },
    resetForm (loginForm) {
      this.$refs[loginForm].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.login-container{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('./login_bg.jpg') no-repeat;
    background-size: cover;
    .login-form{
        background-color: #fff;
        padding: 10px 80px;
        min-width: 360px;
        .login-logo{
            position: relative;
            left: 40px;
            width: 80%;
            height: 57px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: url('./logo_index.png') no-repeat;
            // background-size: cover;
        }
        .login-btn{
            width: 100%;
        }
    }
}
</style>
