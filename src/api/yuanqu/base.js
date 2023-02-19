import request from '@/utils/request'

// 查询一园一档列表
export function listBase(query) {
  return request({
    url: '/yuanqu/base/list',
    method: 'get',
    params: query
  })
}

// 查询一园一档详细
export function getBase(id) {
  return request({
    url: '/yuanqu/base/' + id,
    method: 'get'
  })
}

// 新增一园一档
export function addBase(data) {
  return request({
    url: '/yuanqu/base',
    method: 'post',
    data: data
  })
}

// 修改一园一档
export function updateBase(data) {
  return request({
    url: '/yuanqu/base',
    method: 'put',
    data: data
  })
}

// 删除一园一档
export function delBase(id) {
  return request({
    url: '/yuanqu/base/' + id,
    method: 'delete'
  })
}
