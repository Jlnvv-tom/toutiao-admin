<template>
<el-container class="layout-container">
  <el-aside width="auto" class="aside-container">
    <!-- 侧边栏 -->
    <LayoutAside
    class="aside-menu"
    :isCollapse="isCollapse"
    />
  </el-aside>
  <el-container>
    <el-header
    class="header-container"
    :collapse.sync="isCollapse"
    >
    <!--:collapse.sync这个语法糖就相当于 :collapse="isCollapse"  @update:collapse="val => collapse = val" -->
      <!-- 头部 -->
      <!-- <LayoutHeader/> -->
      <div>
        <i
        :class="{
         'el-icon-s-fold': isCollapse,
         'el-icon-s-unfold': !isCollapse
        }"
        @click="isCollapse =!isCollapse"
        ></i>
        <span>头条管理信息系统</span>
    </div>
    <el-dropdown>
      <div class="avatar-wrap">
        <img class="avatar-wrap-img" :src=user.photo alt="">
        <span>{{user.name}}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item
          @click.native="onLogout"
          >退出
          <!-- 组件不识别原生事件，除非内部做了处理 -->
          </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </el-header>
    <el-main class="main-container">
      <!--主体部分子路由出口 -->
      <router-view/>
    </el-main>
  </el-container>
</el-container>

</template>

<script>
import LayoutAside from '@/components/layout/Aside.vue'
import { getUserProfile } from '@/api/user'
// import LayoutHeader from '@//components/layout/Header'
export default {
  name: 'LayoutIndex',
  data () {
    return {
      user: {
        name: ''
      },
      isCollapse: false // 是否折叠侧边栏
    }
  },
  props: {

  },
  components: {
    LayoutAside
    // LayoutHeader
  },
  computed: {

  },
  watch: {

  },
  created () {
    this.loadUserProfile()
  },
  mounted () {

  },
  methods: {
    // 除了登录接口，其他所有接口都需要授权才能请求，（要提供token令牌）
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },
    onLogout () {
      this.$confirm('确认退出吗?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 把用户登录状态清除
        window.localStorage.removeItem('user')

        // 跳转到登录页面
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.layout-container {
    position: fixed;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
}
.aside-container{
  background-color: #D3DCE6;
  .aside-menu {
    height: 100%;
  }
}
.header-container{
  background-color: #B3C0D1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .avatar-wrap{
    display: flex;
    align-items: center;
    .avatar-wrap-img{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
      border: 1px solid #ffffff
    }
  }
}
.main-container{
  background-color: #E9EEF3;
}

</style>
