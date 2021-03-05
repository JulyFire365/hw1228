import request from '@/utils/request'

export function getPhoto(id) {
  return request({
    url: `/index.php?controller=folder&method=getAllImg`,
    method: 'get',
    params: { id }
  })
}

export function getAlbum() {
  return request({
    url: '/index.php?controller=folder&method=getAllFile',
    method: 'get'
  })
}

