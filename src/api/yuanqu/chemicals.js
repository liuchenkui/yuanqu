import request from '@/utils/request'

// 查询危化品库列表
export function listChemicals(query) {
  return request({
    url: '/yuanqu/chemicals/list',
    method: 'get',
    params: query
  })
}

// 查询危化品库详细
export function getChemicals(id) {
  return request({
    url: '/yuanqu/chemicals/' + id,
    method: 'get'
  })
}

// 新增危化品库
export function addChemicals(data) {
  return request({
    url: '/yuanqu/chemicals',
    method: 'post',
    data: data
  })
}

// 修改危化品库
export function updateChemicals(data) {
  return request({
    url: '/yuanqu/chemicals',
    method: 'put',
    data: data
  })
}

// 删除危化品库
export function delChemicals(id) {
  return request({
    url: '/yuanqu/chemicals/' + id,
    method: 'delete'
  })
}
