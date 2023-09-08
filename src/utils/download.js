import axios from 'axios';
import { ElNotification, ElMessageBox } from 'element-plus';
import sysConfig from "@/config";
import tool from '@/utils/tool';
import router from '@/router';
import { tansParams, blobValidate } from '@/utils/ruoyi'
import { saveAs } from 'file-saver'
import config from "@/config"

axios.defaults.baseURL = ''

axios.defaults.timeout = sysConfig.TIMEOUT

// HTTP request 拦截器
axios.interceptors.request.use(
	(config) => {
		let token = tool.cookie.get("TOKEN");
		if(token){
			config.headers[sysConfig.TOKEN_NAME] = sysConfig.TOKEN_PREFIX + token
		}
		if(!sysConfig.REQUEST_CACHE && config.method == 'get'){ // 非缓存且get请求
			config.params = config.params || {};
			config.params['_'] = new Date().getTime();
		}
		Object.assign(config.headers, sysConfig.HEADERS)
		// get请求映射params参数
		if (config.method === 'get' && config.params) {
			let url = config.url + '?' + tansParams(config.params);
			url = url.slice(0, -1);
			config.params = {};
			config.url = url;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

//FIX 多个API同时401时疯狂弹窗BUG
let MessageBox_401_show = false

// HTTP response 拦截器
axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response) {
			if (error.response.status == 404) {
				ElNotification.error({
					title: '请求错误',
					message: "Status:404，正在请求不存在的服务器记录！"
				});
			} else if (error.response.status == 500) {
				ElNotification.error({
					title: '请求错误',
					message: error.response.data.message || "Status:500，服务器发生错误！"
				});
			} else if (error.response.status == 401) {
				if(!MessageBox_401_show){
					MessageBox_401_show = true
					ElMessageBox.confirm('当前用户已被登出或无权限访问当前资源，请尝试重新登录后再操作。', '无权限访问', {
						type: 'error',
						closeOnClickModal: false,
						center: true,
						confirmButtonText: '重新登录',
						beforeClose: (action, instance, done) => {
							MessageBox_401_show = false
							done()
						}
					}).then(() => {
						router.replace({path: '/login'});
					}).catch(() => {})
				}
			} else {
				ElNotification.error({
					title: '请求错误',
					message: error.message || `Status:${error.response.status}，未知错误！`
				});
			}
		} else {
			ElNotification.error({
				title: '请求错误',
				message: "请求服务器无响应！"
			});
		}

		return Promise.reject(error.response);
	}
);

var http = {

	/** get 请求
	 * @param  {string} url 接口地址
	 * @param  {object} params 请求参数
	 * @param  {object} config 参数
	 */
	get: function(url, params={}, config={}) {
		return new Promise((resolve, reject) => {
			axios({
				method: 'get',
				url: url,
				params: params,
				...config
			}).then((response) => {
				resolve(response.data);
			}).catch((error) => {
				reject(error);
			})
		})
	},

	/** post 请求
	 * @param  {string} url 接口地址
	 * @param  {object} data 请求参数
	 * @param  {object} config 参数
	 */
	post: function(url, data={}, config={}) {
		return new Promise((resolve, reject) => {
			axios({
				method: 'post',
				url: url,
				data: data,
				...config
			}).then((response) => {
				resolve(response.data);
			}).catch((error) => {
				reject(error);
			})
		})
	},

	/** put 请求
	 * @param  {string} url 接口地址
	 * @param  {object} data 请求参数
	 * @param  {object} config 参数
	 */
	put: function(url, data={}, config={}) {
		return new Promise((resolve, reject) => {
			axios({
				method: 'put',
				url: url,
				data: data,
				...config
			}).then((response) => {
				resolve(response.data);
			}).catch((error) => {
				reject(error);
			})
		})
	},

	/** patch 请求
	 * @param  {string} url 接口地址
	 * @param  {object} data 请求参数
	 * @param  {object} config 参数
	 */
	patch: function(url, data={}, config={}) {
		return new Promise((resolve, reject) => {
			axios({
				method: 'patch',
				url: url,
				data: data,
				...config
			}).then((response) => {
				resolve(response.data);
			}).catch((error) => {
				reject(error);
			})
		})
	},

	/** delete 请求
	 * @param  {string} url 接口地址
	 * @param  {object} data 请求参数
	 * @param  {object} config 参数
	 */
	delete: function(url, data={}, config={}) {
		return new Promise((resolve, reject) => {
			axios({
				method: 'delete',
				url: url,
				data: data,
				...config
			}).then((response) => {
				resolve(response.data);
			}).catch((error) => {
				reject(error);
			})
		})
	},

	/** jsonp 请求
	 * @param  {string} url 接口地址
	 * @param  {string} name JSONP回调函数名称
	 */
	jsonp: function(url, name='jsonp'){
		return new Promise((resolve) => {
			var script = document.createElement('script')
			var _id = `jsonp${Math.ceil(Math.random() * 1000000)}`
			script.id = _id
			script.type = 'text/javascript'
			script.src = url
			window[name] =(response) => {
				resolve(response)
				document.getElementsByTagName('head')[0].removeChild(script)
				try {
					delete window[name];
				}catch(e){
					window[name] = undefined;
				}
			}
			document.getElementsByTagName('head')[0].appendChild(script)
		})
	}
}

// 通用下载方法
export function download(url, params, filename) {
	const apiUrl = url[0] == '/' ? `${config.API_URL}${url}` : `${config.API_URL}/${url}`
  return http.post(apiUrl, params, {
    transformRequest: [(params) => { return tansParams(params) }],
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    responseType: 'blob'
  }).then(async (data) => {
    const isLogin = await blobValidate(data);
    if (isLogin) {
      const blob = new Blob([data])
      saveAs(blob, filename)
    } else {
      throw data
    }
  }).catch((r) => {
    console.error(r)
  })
}

export function downloadZip(url, params, filename) {
	const apiUrl = url[0] == '/' ? `${config.API_URL}${url}` : `${config.API_URL}/${url}`
	return http.get(apiUrl, params, {
		headers: { 'Content-Type': 'application/zip' },
		responseType: 'blob'
	}).then(async (data) => {
		const isLogin = await blobValidate(data);
		if (isLogin) {
			const blob = new Blob([data], { type: 'application/zip' })
			saveAs(blob, filename)
		} else {
			throw data
		}
	}).catch((r) => {
    console.error(r)
  })
}

export function downloadFile(id) {
	const apiUrl = `${config.API_URL}/file/downloadFile/${id}`
	return new Promise((resolve, reject) => {
		axios({
			method: 'get',
			url: apiUrl,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			responseType: 'blob'
		}).then(async(response) => {
			const filename = response.headers['content-disposition'].substring(20)
			const data = response.data
			const isLogin = await blobValidate(data);
			if (isLogin) {
				const blob = new Blob([data])
				saveAs(blob, decodeURIComponent(filename))
			} else {
				throw data
			}
			resolve(response.data);
		}).catch((error) => {
			reject(error);
		})
	})
}

export function downloadImage(id) {
	const apiUrl = `${config.API_URL}/file/downloadImage/${id}`
	return new Promise((resolve, reject) => {
		axios({
			method: 'get',
			url: apiUrl
		}).then(async(response) => {
			const fileName = response.data.data.fileName
			const suffix = fileName.split('.')[1]

			const base64 = `data:image/${suffix};base64,`+response.data.data.fileContent
			// const partter = /data:image\/(.*);base64,/

			let a = document.createElement('a')
      a.href = base64
			a.download = fileName;
			document.body.appendChild(a)
			a.click()
			a.remove()

			resolve(response.data);
		}).catch((error) => {
			reject(error);
		})
	})
}

export default http;
