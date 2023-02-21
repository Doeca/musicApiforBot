# Music Api
This is a servance based on [wp_MusicApi](https://github.com/GitHub-ZC/wp_MusicApi) for variant JS player such as APlayer. 


# Router

Now the project supports tencent,migu,kuwo,kugou,netease 5 platforms in total.

/{platform}/detail
/{platform}/songurl
/{platform}/lrcurl

3 interfaces needs `id` parameter by `GET`.

Eg:
https://domain.com/tencent/detial?id=Mn8dkklm

Feature:
When  `/detailurl` called up without Tencent VIP cookies, the server will automatically redirect it to Kuwo by song title.

# Plan

Fork wp_MusicApi and add Bilibili Music Support.