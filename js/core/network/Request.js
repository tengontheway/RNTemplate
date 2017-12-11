/**
 * fetch二次封装
 * @author yangqizhang@medlinker.com
 * @modify 2017-10-19
 * @date 2017-10-19
 */


const APPLICATION_JSON = 'application/json; charset=UTF-8'

let defaultOptions = {
  host: 'http://localhost',
  method: 'get',
  mode: 'cors',
  form: true,
  credentials: 'include',
  beforeSend: () => { return Promise.resolve() },
  timeout: 30000,
  unauth: () => { return Promise.resolve() },     // 未授权
}

/**
 * fetch二次封装，具体配置参考fetchApi
 * @param {any} options
 * - {String} method http请求类型 'post','get'等，默认为'get'
 * - {Object} params url参数
 * - {Object} data 数据
 * - {Number} timeout 过期时间(毫秒)，默认为30000ms
 * - {Boolean} form 是否是表单类型，默认为是，content-type将会设置成form-data，如果为否，content-type会设置成application/json
 *
 * @returns
 */
function http(options) {
  // 合并默认配置
  options = {
    ...defaultOptions,
    ...options
  }
  // 请求是否中断标志
  let isAborted = false, httpTimeout = null
  let promise = new Promise((resolve, reject) => {
    let { host, url, timeout, form, dataType = 'json', headers = {}, data, params = {}, ...fetchOptions } = options
    url = host + url

    // 设置headers
    let requestHeaders = new Headers()
    for (let key in headers) {
      if (typeof headers[key] === 'function') {
        requestHeaders.append(key, headers[key]())
      } else {
        requestHeaders.append(key, headers[key])
      }
    }
    fetchOptions.headers = requestHeaders

    // 设置params ios9不支持
    // let requestParams = new URLSearchParams()
    // for (let key in params) {
    //     requestParams.append(key, params[key])
    // }
    // if (requestParams.toString()) {
    //     url += '?' + requestParams.toString()
    // }

    let paramStr = []
    for (let key in params) {
      paramStr.push(`${key}=${encodeURIComponent(params[key])}`)
    }

    if (paramStr.length) {
      url += '?' + paramStr.join('&')
    }

    // requestHeaders.append('Accept', APPLICATION_JSON)
    // requestHeaders.append('Content-Type', APPLICATION_JSON)
    // 设置了data
    if (data) {
      if (form === true) {
        // 设置formData
        let requestFormData = new FormData()
        for (let key in data) {
          requestFormData.append(key, data[key])
        }
        fetchOptions.body = requestFormData
      } else {
        requestHeaders.append('Content-Type', APPLICATION_JSON)
        fetchOptions.body = JSON.stringify(data)
      }
    }
    // 过期
    if (timeout) {
      httpTimeout = setTimeout(() => {
        // 过期了也会中断
        isAborted = true
        reject({ code: -2, message: '请求超时' })
      }, timeout)
    }

    options.beforeSend(fetchOptions).then(() => {
      // console.log(url);
      // console.log(JSON.stringify(fetchOptions));

      fetch(url, fetchOptions)
        .then(res => {
          // console.log(res);
          if (isAborted) return
          clearTimeout(httpTimeout)
          // 非200-299
          if (!res.ok) {
            return reject({ code: res.status || -1, message: '请求失败，请检查网络链接状态以及应用权限' })
          }

          // 处理dateType
          if (res[dataType] && dataType !== 'raw') {
            res[dataType]().then((data) => {
              // TODO: 这里暂时写死自定义处理，将来考虑加入配置
              if (data.code <= 200) {
                resolve(data)
                // console.log(data);
              } else {
                if (data.code === 401) {
                    // return auth.logout().then(() => {
                    //   global.Toast && Toast.show('你的登录已过期，请重新登录', 2000)
                    //   navigatorService.reset('Login')
                    // })
                    return options.unauth(fetchOptions)
                }
                reject({ code: data.code, message: data.msg })
              }
            })
          } else {
            // 返回元数据
            resolve(res)
          }
        }, err => {
          if (isAborted) return
          clearTimeout(httpTimeout)
          // TODO: 这里暂时写死自定义处理，将来考虑加入配置
          reject({ code: err.status || -1, message: '请求失败，请检查网络链接状态以及应用权限' })
        })
    })
  })

  promise.abort = () => {
    isAborted = true
    clearTimeout(httpTimeout)
  }

  return promise
}

/**
 * 配置默认设置
 * @param {*} options
 * -
 */
http.setDefaultOptions = (options) => {
  defaultOptions = {
    ...defaultOptions,
    ...options
  }
}

/**
 * get请求
 * @param {*} options
 * @return {Promise} fetch的promise
 */
http.get = (options) => {
  return http(options)
}

/**
 * post请求
 * @param {*} options
 * @return {Promise} fetch的promise
 */
http.post = (options) => {
  return http({
    ...{
      method: 'post',
    },
    ...options
  })
}

/**
 * delete请求
 * @param {*} options
 * @return {Promise} fetch的promise
 */
http.delete = (options) => {
  return http({
    ...{
      method: 'delete',
    },
    ...options
  })
}

/**
 * put请求
 * @param {*} options
 * @return {Promise} fetch的promise
 */
http.put = (options) => {
  return http({
    ...{
      method: 'put',
    },
    ...options
  })
}

export default http
