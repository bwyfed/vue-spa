import 'whatwg-fetch'

// HTTP 工具类
export default class Http {
  static async request (method, url, data) {
    const param = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (typeof method === 'string' && method.toUpperCase() === 'GET') {
      url += this.encodeFormData(data)
    } else {
      param['body'] = JSON.stringify(data)
    }

    return fetch(url, param).then(response => this.isSuccess(response))
      .then(response => {
        return response.json()
      })
  }

  // 判断请求是否成功
  static isSuccess (res) {
    if (res.status >= 200 && res.status < 300) {
      return res
    } else {
      this.requestException(res)
    }
  }
  // 处理异常
  static requestException (res) {
    const error = new Error(res.statusText)
    error.response = res
    throw error
  }
  // 编码对象的属性
  static encodeFormData (data) {
    if (!data) return ''
    let pairs = []
    for (let name in data) {
      if (!data.hasOwnProperty(name)) continue
      if (typeof data[name] === 'function') continue
      let value = data[name].toString()
      name = encodeURIComponent(name.replace('%20', '+'))
      value = encodeURIComponent(value.replace('%20', '+'))
      pairs.push(name + '=' + value)
    }
    return pairs.length ? '?' + pairs.join('&') : ''
  }
  static get (url, data) {
    return this.request('GET', url, data)
  }
  static put (url, data) {
    return this.request('PUT', url, data)
  }
  static post (url, data) {
    return this.request('POST', url, data)
  }
  static patch (url, data) {
    return this.request('PATCH', url, data)
  }
  static delete (url, data) {
    return this.request('DELETE', url, data)
  }
}
