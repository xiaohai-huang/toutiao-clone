# Toutiao API

- Weather: https://www.toutiao.com/stream/widget/local_weather/data
- hotboard: https://m.toutiao.com/related/hotboard
- initial news: https://www.toutiao.com/api/pc/feed/?min_behot_time=0&category=__CATEGORY__&utm_source=toutiao&widen=1&tadrequire=true&_signature=_02B4Z6wo00f01eGJDDAAAIDAlAcgGmRjvLXhrAiAABhZLz3kN1WAXgzidEIUQz9.x7RjYR.2l1Rj3-hK0D1o3V5qCsftnjal-G7RgMT9F4EKoctUWV9hz61fCXC0A1q-hTDG5QE6Y0Yuzi2Md3

- more news: https://www.toutiao.com/api/pc/feed/?max_behot_time=__TIME__&category=__CATEGORY__&utm_source=toutiao&widen=1&tadrequire=true&_signature=_02B4Z6wo00d01cNbrMQAAIDAttWA7LkcgDnDfqhAABDkU0kheQXjzR1D2fdZCYu4auin7wL9RbfrsY8LPRymCVCfZDkQnaUS9CAdr6JpJWtrF8y1f8J9zzQ1j5YYteIN8OG2DTyxYFkIMjr5f2 (**TIME** is obtained by the next attribute of each news response which is at the bottom)

---

## Components

### Single news info brief (list)

**article**
normal

```javascript
const normal = {
"item_id":"Number",
"article_genre":"article,
"single_mode":"boolean",
"title":"string",
"behot_time":"Date.now() - 3 digites loss",
"source":"string - author name",
"media_avatar_url":"url",
"comments_count":"number",
}
```

**article_details**

```js
const details = {
  "title":string,
  "content",
  publish_time,
  comment_count,
  "media_user":{
    screen_name,
    avatar_url,
  }
}
```

### NewsCard

single_mode:false == no video or image.
single_mode:true == one video or image on the left.

- news details:
  UI: https://m.toutiaoimg.cn/__{newsItem.item_id}__
  JSON:https://m.toutiaoimg.cn/{newsItem.item_id}/info/v2/?_signature=_02B4Z6wo00f01WJav3gAAIDDxFv75u.KQlliT7vAADil6foNRGdv-p.FzkAO6IiBEdniarpKheKe3inoSh5NbH1ZubEI62CXVYUjai.FWOyspWiqCa3Dzw2zEUo0LURAbhCxmK7w5r4KgpGM46

### Video list

![image-20210321184401454](C:\Users\Xiaohai\AppData\Roaming\Typora\typora-user-images\image-20210321184401454.png)

cover image: "https://p6-xg.byteimg.com/" + `image_uri`

### Video

### 

```js
// at news details
{
  
}
```

# Notes

1. Popover is so annoying, the pointerEvent should set to none.
