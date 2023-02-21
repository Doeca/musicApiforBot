# Music Api
This is a servance based on [wp_MusicApi](https://github.com/GitHub-ZC/wp_MusicApi) for variant JS player such as APlayer. 


# Router

Now the project supports tencent,migu,kuwo,kugou,netease 5 platforms in total.

/{platform}/detail
    Response form:
    {'name':'Let it go','author':'','playUrl':'http://','lrcUrl':'http://','cover':'http://'}
/{platform}/songUrl
    Will be redirected to the real play url
/{platform}/lrcUrl

3 interfaces needs `id` parameter by `GET`.

Eg:
https://domain.com/tencent/detial?id=Mn8dkklm

Feature:
When  `/detail` called up without Tencent VIP cookies, the server will automatically redirect it to Kuwo by song title.

# Plan

Fork wp_MusicApi and add Bilibili Music Support.



https://u.y.qq.com/cgi-bin/musicu.fcg?format=json&data={"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"filename":["M500003mVERF2THBiE003mVERF2THBiE.mp3"],"guid":"10000","songmid":["003mVERF2THBiE"],"songtype":[0],"uin":"0","loginflag":1,"platform":"20"}},"loginUin":"0","comm":{"uin":"0","format":"json","ct":24,"cv":0}}