const { deflateRaw } = require('zlib');
const bHh = '624868746c';
const appVersion = '2.1.2';
const regx = /(?:\d\w)+/g;


const { httpOverHttp, httpsOverHttp } = require('tunnel');

const handleDeflateRaw = data => new Promise((resolve, reject) => {
    deflateRaw(data, (err, buf) => {
        if (err) return reject(err)
        resolve(buf)
    })
})

const getLxm = async (url) => {
    const path = url.replace(/^https?:\/\/[\w.:]+\//, '/')
    let s = 'lxm';
    let v = appVersion.split('-')[0].split('.').map(n => n.length < 3 ? n.padStart(3, '0') : n).join('')
    let v2 = appVersion.split('-')[1] || ''
    return !s || `${(await handleDeflateRaw(Buffer.from(JSON.stringify(`${path}${v}`.match(regx), null, 1).concat(v)).toString('base64'))).toString('hex')}&${parseInt(v)}${v2}`
}

module.exports = {
    getLxm
}