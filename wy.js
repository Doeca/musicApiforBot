const axios = require('axios');
const prefix = "https://netease.doeca.cc"
let loadStatus = 1;

const target = () => {
    console.log("test");
    try {
        axios.get(`${prefix}/login/status`).then(resp => {
            if (resp.data.data.code != 200) 
                throw 'Call Fail';
            
            if(resp.data.data.account.status == -10)
            {
                if(loadStatus == 1)
                {
                    //notify to scan login
                    loadStatus = 0;
                    console.log("[Logout] 网易云登陆已失效，需要重新登陆")
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