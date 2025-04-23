import { GET, POST, FILE, FILEPOST, PUT, GETNOBASE } from "../api";

// url前缀公共的
const prefix = "/api/app"
// url中说明模块的公共前缀字段
const module = '/tv-in'


const indexUrl = {
    'leftBottom': "/bigscreen/leftBottom",
}

export default indexUrl

export const leftBottom = (param: any = {}) => {
    return GET(indexUrl.leftBottom, param)
}

export const palletSortCountApi = (param: any = {}) => {
    return GET(`${prefix}${module}/pallet-sort-count`, param)
}

export const errorCacheListApi = (param: any = {}) => {
    return GET(`${prefix}${module}/error-cache-list`, param)
}

export const availableCargoLocationApi = (param: any = {}) => {
    return GET(`${prefix}${module}/available-cargo-location`, param)
}

export const inWareHouseTaskApi = (param: any = {}) => {
    return GET(`${prefix}${module}/in-ware-house-task`, param)
}
