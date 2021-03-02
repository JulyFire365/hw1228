<template>
  <div class="image-box">
    <div v-for="item in list" :key="item.id" class="block" @click="click(item)">
      <el-image class="img" :src="item.link" fit="cover" />
      <div class="name">{{ item.name }}</div>
    </div>
  </div>
</template>
<script>
import { getAlbum } from '@/api/api'

export default {
  name: 'Album',
  data() {
    return {
      list: []
    }
  },
  mounted() {
    getAlbum().then(({ data }) => {
      this.list = data
    })
  },
  methods: {
    click(obj) {
      this.$router.push(`/photo/${obj.id}?album=${obj.name}`)
    }
  }
}
</script>
<style lang="scss">

</style>
