<template>
  <div>
    <el-page-header :content="name" @back="goBack" />
    <div class="image-box">
      <div v-for="(item,n) in list" :key="n" class="block img-block" @click="click(item)">
        <el-image class="img" :src="item" :preview-src-list="list" fit="cover" />
      </div>
    </div>
  </div>
</template>
<script>
import { getPhoto } from '@/api/api'

export default {
  name: 'Photo',
  data() {
    return {
      id: null,
      name: '',
      list: []
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.name = this.$route.query.album
    if (this.id) {
      getPhoto(this.id).then(({ data }) => {
        this.list = data
      })
    } else {
      this.$message.error('相册异常，无法展示！')
    }
  },
  methods: {
    click(obj) {
      console.log(obj)
    },
    goBack() {
      this.$router.back()
    }
  }
}
</script>
<style lang="scss" scoped>
.el-page-header{
  margin-bottom: 15px;
}
</style>
