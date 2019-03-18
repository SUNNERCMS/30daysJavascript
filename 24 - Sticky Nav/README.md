# Day24 - Sticky Nav 粘性导航栏
## 效果图
![](http://om1c35wrq.bkt.clouddn.com/day24-xiaoguotu.gif)
## HTML源码
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Sticky Nav</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>

*,

  


ter;
  align-items: center;
}

li.logo {
  max-width: 0;
  overflow: hidden;
  background: white;
  transition: all .5s;
  font-weight: 600;
  font-size: 30px;
}

.fixed-nav li.logo {
  max-width: 500px;
}

li.logo a {
  color: black;
}

nav a {
  text-decoration: none;
  padding: 20px;
  display: inline-block;
  color: white;
  transition: all 0.2s;
  text-transform: uppercase;
}
```


## JS源码

```js
  <script>
    <!--获取导航对象-->
    let nav = document.querySelector('nav#main');
    <!--获取导航对象距离document顶部的距离-->
    let navTop = nav.offsetTop;
    
    
    function fixNav() {
    <!--临界值判断-->
     if (window.scrollY >= navTop) {
     <!--offsetHeight 是一个只读属性，它返回该元素的像素高度，高度包含该元素的垂直内边距和边框，且是一个整数。-->
       document.body.style.paddingTop = `${nav.offsetHeight}px`;
       <!--添加fixed-nav class-->
       document.body.classList.add('fixed-nav');
     } else {
     <!--重新设置body的paddingTop-->
       document.body.style.paddingTop = 0;
       <!--移除fixed-nav-->
       document.body.classList.remove('fixed-nav');
     }
    }
    <!--事件监听，当document滚动时，调用fixNav方法进行处理-->
    document.addEventListener('scroll', fixNav);
 </script>
```

下面的代码通过`document.body.classList.add('fixed-nav');`显示logo，通过`document.body.classList.remove('fixed-nav');`隐藏logo。

```css
li.logo {
  max-width: 0;
  overflow: hidden;
  background: white;
  transition: all .5s;
  font-weight: 600;
  font-size: 30px;
}

.fixed-nav li.logo {
  max-width: 500px;
}
```



