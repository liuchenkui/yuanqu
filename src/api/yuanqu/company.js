import request from '@/utils/request'

// 查询一企一档列表
export function listCompany(query) {
  return request({
    url: '/yuanqu/company/list',
    method: 'get',
    params: query
  })
}

// 查询一企一档详细
export function getCompany(id) {
  return request({
    url: '/yuanqu/company/' + id,
    method: 'get'
  })
}

// 新增一企一档
export function addCompany(data) {
  return request({
    url: '/yuanqu/company',
    method: 'post',
    data: data
  })
}

// 修改一企一档
export function updateCompany(data) {
  return request({
    url: '/yuanqu/company',
    method: 'put',
    data: data
  })
}

// 删除一企一档
export function delCompany(id) {
  return request({
    url: '/yuanqu/company/' + id,
    method: 'delete'
  })
}
