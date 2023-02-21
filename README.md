# Music Api
This is a servance based on [wp_MusicApi](https://github.com/GitHub-ZC/wp_MusicApi) for variant JS player such as APlayer. 


# Router

Now the project supports qq,migu,kuwo,kugou,wy 5 platforms in total.

/{platform}/detail
    Response form:
    {'name':'Let it go','author':'','playUrl':'http://','lrcUrl':'http://','cover':'http://'}
/{platform}/songUrl
    Will be redirected to the real play url
/{platform}/lrcUrl

3 interfaces needs `id` parameter by `GET`.

Eg:
https://domain.com/qq/detial?id=Mn8dkklm

Feature:
When  `/detail` called up without Tencent VIP cookies, the server will automatically redirect it to Kuwo by song title.

# Plan

Fork wp_MusicApi and add Bilibili Music Support.