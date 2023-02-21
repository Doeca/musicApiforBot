const { crypto } = require('crypto');
const { dns } = require('dns');

const toMD5 = str => crypto.createHash('md5').update(str).digest('hex');


const ipMap = new Map()
const getHostIp = hostname => {
    const result = ipMap.get(hostname)
    if (typeof result === 'object') return result
    if (result === true) return
    ipMap.set(hostname, true)
    // console.log(hostname)
    dns.lookup(hostname, {
        // family: 4,
        all: false,
    }, (err, address, family) => {
        if (err) return console.log(err)
        // console.log(address, family)
        ipMap.set(hostname, { address, family })
    })
}

const dnsLookup = (hostname, options, callback) => {
    const result = getHostIp(hostname)
    if (result) return callback(null, result.address, result.family)

    dns.lookup(hostname, options, callback)
}

module.exports = {
    toMD5,
    getHostIp,
    dnsLookup
}