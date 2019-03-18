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

  <header>
pora in aspernatur pariatur fugit quibusdam dolores sunt esse magni, ut, dignissimos.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore tempora rerum, est autem cupiditate, corporis a qui
      libero ipsum delectus quidem dolor at nulla, adipisci veniam in reiciendis aut asperiores omnis blanditiis quod quas
      laborum nam! Fuga ad tempora in aspernatur pariatur fugit quibusdam dolores sunt esse magni, ut, dignissimos.</p>

body {
  margin: 0;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

.site-wrap {
  max-width: 700px;
  margin: 70px auto;
  background: white;
  padding: 40px;
  text-align: justify;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.05);
  transform: scale(0.98);
  transition: transform 0.5s;
}

.fixed-nav .site-wrap {
  transform: scale(1);
}

header {
  text-align: center;
  height: 50vh;
  background: url(http://wes.io/iEgP/wow-so-deep.jpg) bottom center no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  color: white;
  font-size: 7vw;
  text-shadow: 3px 4px 0 rgba(0, 0, 0, 0.2)
}

nav {
  background: black;
  top: 0;
  width: 100%;
  transition: all 0.5s;
  position: relative;
  z-index: 1;
}

.fixed-nav nav {
  position: fixed;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
}

nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
}

nav li {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
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



