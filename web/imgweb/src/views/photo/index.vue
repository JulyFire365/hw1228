<template>
  <div>
    <el-page-header :content="name+` (${list.length}张图片)`" @back="goBack" />
    <div class="image-box">
      <div v-for="(item,n) in list" :key="n" class="block">
        <el-image class="img" :src="item.thumbImg" :preview-src-list="getPreview(n)" fit="cover" lazy />
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
    },
    getPreview(index) {
      const arr = this.list.map(a => a.originImg)
      const split = arr.splice(index)
      return split.concat(arr)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-page-header{
  margin-bottom: 15px;
}
</style>
