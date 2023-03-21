const axios = require('axios');
const prefix = "http://netease.doeca.cc"
const notifyUrl = "http://tun4.cquluna.top:3002/notifyLogout"
const notifyinUrl = "http://tun4.cquluna.top:3002/notifyLogin"
let loadStatus = 1;

const target = () => {
    try {
        axios.get(`${prefix}/song/url?id=29713754`).then(resp => {
            if (resp.data.data.code != 200)
                throw 'Call Fail';


            if (resp.data.data.size != 24101355) {
                if (loadStatus == 1) {
                    //notify to scan login
                    try {
                        fetch(notifyUrl, { mode: "cors" }).then(res => { })
                    } catch (error) {

                    }
                    loadStatus = 0;
                    console.log("[Logout] 网易云登陆已失效，需要重新登陆")
                }
            } else {
                if(loadStatus == 0)
                {
                    try {
                        fetch(notifyinUrl, { mode: "cors" }).then(res => { })
                    } catch (error) {

                    }
                    loadStatus = 1;
                    console.log("[Logout] 网易云登陆已恢复")
                }
                
            }
        })
    } catch (err) {
        console.error(err)
    }
}
target();
setInterval(target, 30 * 60 * 1000);


module.exports = {
    loadStatus
}