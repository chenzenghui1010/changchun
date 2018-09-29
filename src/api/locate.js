import request from './request'

export function getVuex(data) {
  
  return request({
    url:'/getAlarmList',
    method:'post',
    params:data
  })
}


