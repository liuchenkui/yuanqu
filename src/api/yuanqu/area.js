import request from '@/utils/request'

// 查询风险区域列表
export function listArea(query) {
  return request({
    url: '/yuanqu/area/list',
    method: 'get',
    params: query
  })
}

// 查询风险区域详细
export function getArea(id) {
  return request({
    url: '/yuanqu/area/' + id,
    method: 'get'
  })
}

// 新增风险区域
export function addArea(data) {
  return request({
    url: '/yuanqu/area',
    method: 'post',
    data: data
  })
}

// 修改风险区域
export function updateArea(data) {
  return request({
    url: '/yuanqu/area',
    method: 'put',
    data: data
  })
}

// 删除风险区域
export function delArea(id) {
  return request({
    url: '/yuanqu/area/' + id,
    method: 'delete'
  })
}
