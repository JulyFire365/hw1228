<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'" class="drawer-bg" @click="handleClickOutside" />
    <div class="main-container">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
    </div>

  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    
  },
  computed: {
    ...mapState({
      device: state => state.app.device,
    }),
    classObj() {
      return {
        mobile: this.device === 'mobile'
      }
    }
  },
  mounted() {

  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  .mobile .fixed-header {
    width: 100%;
  }
</style>
