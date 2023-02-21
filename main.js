// 引入 wp_MusicApi
const wp_musicapi = require("./wp_MusicApi");

// 咪咕搜索
wp_musicapi["/v1/migu/song"]({br: 1}).then(res => console.log(res));
// QQ搜索
wp_musicapi["/v1/qq/search"]({key: '周杰伦'}).then(res => console.log(res));

// 酷我搜索
(async () => {
    let res = await wp_musicapi["/v1/kuwo/search"]({
        from: 'pc',
        key: '许嵩'
    });

    console.log(res);
})();