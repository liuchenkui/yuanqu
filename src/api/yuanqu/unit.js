import request from '@/utils/request'

// 查询风险单元列表
export function listUnit(query) {
  return request({
    url: '/yuanqu/unit/list',
    method: 'get',
    params: query
  })
}

// 查询风险单元详细
export function getUnit(id) {
  return request({
    url: '/yuanqu/unit/' + id,
    method: 'get'
  })
}

// 新增风险单元
export function addUnit(data) {
  return request({
    url: '/yuanqu/unit',
    method: 'post',
    data: data
  })
}

// 修改风险单元
export function updateUnit(data) {
  return request({
    url: '/yuanqu/unit',
    method: 'put',
    data: data
  })
}

// 删除风险单元
export function delUnit(id) {
  return request({
    url: '/yuanqu/unit/' + id,
    method: 'delete'
  })
}
