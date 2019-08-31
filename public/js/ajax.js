let ajax = (function() {
    //1 创建ajax实例  兼容写法
    // let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    let xhr = new XMLHttpRequest();
    // 打开i浏览器和服务器的连接
    //get  ？传参
    function get(opt) {
        return new Promise((resolve, reject) => {
            let { url, params, async = false, resType = "json" } = opt;
            // format(params)   //name=zs&age=18&addres=11
            url = params ? url + "?" + format(params) : url;
            xhr.open("get", url, async)
                //等待服务器做出响应
            xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            if (resType === "json") {
                                resolve(JSON.parse(xhr.responseText)) //{code:1,msg:""}
                            } else {
                                resolve(xhr.responseText) //1
                            }
                        } else {
                            reject(new Error())
                        }
                    }
                }
                //发送请求
            xhr.send(null)
        })
    }
    //post  请求 send传参
    function post(opt) {
        return new Promise((resolve, reject) => {
            let { url, params = {}, resType = "json", async = false, paramsType = "application/x-www-form-urlencoded" } = opt;
            xhr.open("post", url, async)
                //等待服务器做出响应
            xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            if (resType === "json") {
                                resolve(JSON.parse(xhr.responseText)) //{code:1,msg:""}
                            } else {
                                resolve(xhr.responseText) //1
                            }
                        } else {
                            reject(new Error())
                        }
                    }
                }
                //发送请求  
                //为了告诉 后台 前端是以那种方式传递的数据
            xhr.setRequestHeader("content-type", paramsType)
            console.log(params)
            params = paramsType === "application/x-www-form-urlencoded" ? format(params) : JSON.stringify(params)
                //  {name:zs,age:18}  JSON.parse()
            xhr.send(params) //name=zs&age=18   querystring.parse()
        })
    }

    function format(params) {
        return Object.entries(params).map(item => item.join("=")).join("&")
    }
    return {
        get,
        post
    }
})()