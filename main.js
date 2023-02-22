const Koa = require('koa');
const cors = require('koa2-cors');
const axios = require('axios');
const router = require('koa-router')();
const app = new Koa();
const wp_musicapi = require("./wp_MusicApi");
const domain = "http://musicapi.doeca.cc:3001"
const wyApi = "https://netease.doeca.cc"



app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});


// add url-route:
router.get('/:platform/detail', async (ctx, next) => {
    var platform = ctx.params.platform;
    var id = ctx.request.query.id;
    id = id.toString().trim();


    switch (platform) {
        case "qq":
            let line = ""
            await wp_musicapi["/v1/qq/songDetail"]({ id: id }).then(res => {
                if (res.result != 100) {
                    ctx.rest({
                        result: 500,
                        errMsg: '[qq] unknown error',
                    });
                    return;
                }
                line = res.data.extras.name + " " + res.data.track_info.singer[0].name;
            });

            await wp_musicapi['/v1/kuwo/search']({ key: line }).then(res => {
                if (res.data.total == 0) {
                    ctx.status = 404
                    ctx.body = "Not Found"
                    return;
                }
                rtx = {
                    name: res.data.list[0].name,
                    author: res.data.list[0].artist,
                    playUrl: `${domain}/kuwo/songUrl?id=${res.data.list[0].rid}`,
                    lrcUrl: `${domain}/kuwo/lrcUrl?id=${res.data.list[0].rid}`,
                    cover: res.data.list[0].albumpic
                }

                ctx.response.body = JSON.stringify(rtx);
                return
            })
            break;
        case 'wy':
            try {
                await axios.get(`${wyApi}/song/detail?ids=${id}`).then(res => {
                    let resp = res.data
                    if (resp.code != 200 || resp.songs.length == 0)
                        throw -1;
                    let authorName = "";

                    resp.songs[0].ar.forEach((v, i) => {
                        authorName = authorName + v.name + (i + 1 == resp.songs[0].ar.length ? "" : "/");
                    });

                    let rtx = {
                        name: resp.songs[0].name,
                        author: authorName,
                        playUrl: `${domain}/wy/songUrl?id=${id}`,
                        lrcUrl: `${domain}/wy/lrcUrl?id=${id}`,
                        cover: resp.songs[0].al.picUrl
                    }

                    ctx.response.body = JSON.stringify(rtx);
                    return;
                })
            }
            catch (err) {
                ctx.status = 404
                ctx.body = "Not Found"
                return;
            }
            break;

        case 'kuwo':
            break;
        default:
            ctx.response.body = JSON.stringify({ "res": "-1" });
    }


});

router.get('/:platform/songUrl', async (ctx, next) => {
    var platform = ctx.params.platform;
    var id = ctx.request.query.id;
    id = id.toString().trim();

    switch (platform) {
        case 'kuwo':
            try {
                await axios.get(`https://antiserver.kuwo.cn/anti.s?type=convert_url&format=mp3&response=url&rid=${id}`).then(res => {
                    ctx.response.redirect(res.data);
                })
            } catch (error) {
                ctx.status = 404;
            }
            break;
        case 'wy':
            try {
                await axios.get(`${wyApi}/song/url/v1?id=${id}&level=higher`).then(res => {
                    let resp = res.data
                    if (resp.code != 200 || resp.data.length == 0)
                        throw -1;
                    url = resp.data[0].url;
                    ctx.response.redirect(url);
                })
            } catch (error) {
                ctx.status = 404;
            }
        default:
    }
    //https://antiserver.kuwo.cn/anti.s?type=convert_url&format=mp3&response=url&rid=235497
});

router.get('/:platform/lrcUrl', async (ctx, next) => {
    ctx.set({ 'Access-Control-Allow-Origin': '*' });
    var platform = ctx.params.platform;
    var id = ctx.request.query.id;
    id = id.toString().trim();
    switch (platform) {
        case 'kuwo':
            try {
                await wp_musicapi["/v1/kuwo/lyric"]({ rid: id }).then(
                    res => { ctx.response.body = res.lyric_str }
                );
            } catch (error) {
                ctx.status = 404;
            }
            break;
        case 'wy':
            try {
                await axios.get(`${wyApi}/lyric?id=${id}`).then(res => {
                    let resp = res.data
                    if (res.status != 200)
                        throw -1;
                    ctx.response.body = resp.lrc.lyric;
                })
            } catch (error) {
                ctx.status = 404;
            }
        default:
    }


});

// add router middleware:
app.use(router.routes());
app.use(cors());
console.log("start listening at 3001")
app.listen(3001);