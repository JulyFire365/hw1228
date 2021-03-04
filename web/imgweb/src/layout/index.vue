<template>

  <el-container :class="classObj" class="app-wrapper" direction="vertical">
    <!-- <div v-if="device==='mobile'" class="drawer-bg" @click="handleClickOutside" /> -->
    <!-- <el-header style="font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header> -->
    <el-main class="main-container">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="views">
          <router-view :key="key" />
        </keep-alive>
      </transition>
    </el-main>
  </el-container>
</template>

<script>

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design
export default {
  name: 'Layout',
  components: {

  },
  data() {
    return {
      views: []
    }
  },
  computed: {
    cachedViews() {
      const view = this.$route
      const cachedViews = this.views
      // console.log(this.$route)
      if (!cachedViews.includes(view.name) && !view.meta.noCache) {
        cachedViews.push(view.name)
      }
      return cachedViews
    },
    key() {
      return this.$route.path
    },
    classObj() {
      return {
        mobile: this.$_isMobile()
      }
    }
  },
  mounted() {

  },
  methods: {
    $_isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    }
  }
}
</script>

<style lang="scss" scoped>
  @mixin clearfix {
    &:after {
      content: "";
      display: table;
      clear: both;
    }
  }

  .app-wrapper {
    @include clearfix;
    position: relative;
    align-items: center;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }
  .main-container{
    width: 100%;
    max-width: 1200px;
  }
  .mobile .fixed-header {
    width: 100%;
  }
</style>
