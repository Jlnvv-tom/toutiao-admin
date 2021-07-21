<template>
  <div class='header-container'>
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
        <img class="avatar-wrap-img" src="../../assets/6.jpg" alt="">
        <span>用户昵称</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item>修改</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
 </div>
</template>

<script>
export default {
  name: 'LayoutHeader',
  data () {
    return {
      // isCollapse // 不用这个，使用父组件传值
    }
  },
  props: ['is-collapse'],
  components: {

  },
  computed: {

  },
  watch: {

  },
  created () {

  },
  mounted () {
    this.$emit('isCollapse', 'ture')
  },
  methods: {

  }
}
</script>

<style scoped lang="less">
.header-container{
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
</style>
