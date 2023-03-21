const axios = require('axios');
const prefix = "http://netease.doeca.cc"
const notifyUrl = "http://tun4.cquluna.top:3002/notifyLogout"
let loadStatus = 1;

const target = () => {
    try {
        axios.get(`${prefix}/login/status`).then(resp => {
            if (resp.data.data.code != 200)
                throw 'Call Fail';

            if (resp.data.data.account == null) {
                if (loadStatus == 1) {
                    //notify to scan login
                    try {
                        fetch(notifyUrl, { mode: "cors" }).then(res => { })
                    } catch (error) {

                    }
                    loadStatus = 0;
                    console.log("[Logout] 网易云登陆已失效，需要重新登陆")
                }
                return;
            } else {
                loadStatus = 1;
            }

            if (resp.data.data.account.status != 0) {
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
                loadStatus = 1;
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