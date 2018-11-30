# Day02 - JavaScript + CSS Clock

## 简介
第二天的练习是用JS+CSS模拟时钟效果。

效果如下：
![](https://github.com/SUNNERCMS/30daysJavascript/blob/master/02%20-%20JS%20and%20CSS%20Clock/image/GIF.gif)  

实现以上模拟时钟的效果，大致思路和解决方案如下：
* 分别获取到当前时间的时、分、秒。
* 通过时分秒对一圈360度，进行映射，确定每一个指针所需旋转的角度。
* 通过CSS的`transform：rotate(deg)`，来实时的调整指针在键盘中的位置。  
### 文件说明：
(1)image:用来存放背景图片  
(2)click.js:最终版JS逻辑  
(3)click.css:最终版样式表  
## 页面布局

```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>RealTimeClock</title>
    <link rel="stylesheet" href="click.css">
</head>
<body>
    <div class="clock">
        <div class="clock-face">
            <div class="hand hour-hand"></div>
            <div class="hand min-hand"></div>
            <div class="hand second-hand"></div>
        </div>
    </div>
    <div class="dateblock">
      <div class="date"></div>
      <div class="week"></div>
      <div class="time"></div>
    </div>
    <script src="clock.js"></script>
</body>
</html>
```

## CSS样式

```css
 /*时分秒指针初始化是垂直的，指针移动没有设置过渡效果和过渡时间，
就是根据角度来定位置*/
html{
    /*font-size:625%,默认字体大小都是16px,16*62.5=100px,1rem=100px*/
    font-size:625%;
    background: #018DED url(./image/picture4.jpg) bottom center ;
    background-size: cover;
}
html,body{
    margin:0px;
    padding:0px;
    display: flex;
    min-height: 100vh;
    justify-content:center;
    align-items:center;
}
/*采用的是标准盒模型，即是纯宽高*/
.clock{
    position:relative;
    width:3rem;
    height:3rem;
    border:0.2rem solid white;
    margin:0.5rem auto;
    padding:0.2rem;
    background: rgba(0,0,0,0.4);
    border-radius:50%;
    box-shadow:0 0 2px 4px rgba(0,0,0,0.1),
               0 0 10px 3px rgba(0,0,0,0.2),
               0 0 1px 2px #EFEFEF inset,
               0 0 30px black inset;
}
.clock-face{
    position:relative;
    width:100%;  /*这里的100%是300px,是clock的宽*/
    height:100%;
}
/*时钟表表盘中心圆点*/
.clock-face::after{
    content:'';
    display: block;
    width:.1rem;
    height:.1rem;
    background-color: #a8c5d1;
    position: absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    border-radius:50%;
}
/*指针通用样式，在sass中可以封装成一个mixin*/
.hand{
    background: #fff;
    position:absolute;
    bottom:50%;
    left:50%;
    /*transform:translateX(-50%); 虽说这样可以使指针居中线，但是translate的平移是相对于自身center位置的，那么这样居中处理后，下面的旋转仍旧按的是平移之前的right位置为原点，虽说三个指针通过translateY看似处于一条中线上，实际旋转时仍然是按照各自的right位置进行旋转*/ 
    transform:rotate(0deg);
    transform-origin:50% 100%;
    box-shadow: 
      0 0 0 1px rgba(0, 0, 0, 0.1),
      0 0 8px rgba(0, 0, 0, 0.4),
      2px 5px 1px rgba(0, 0, 0, 0.5);
}

/*时针样式*/
.hour-hand{
    height:40%;
    width:0.1rem;
    margin-left:-0.05rem;  /*使时针向左移动自身的一半来居中*/
    border-bottom-left-radius: .05rem;
    border-top-left-radius:.05rem;
}
.min-hand {
    height: 45%;
    width: .05rem;
    margin-left:-0.025rem;
}
.second-hand {
    height: 50%;
    width: .02rem;
    margin-left:-0.01rem;
    border-bottom-left-radius: .02rem;
    border-top-left-radius: .02rem;
    background-color: red;
}
/*日期，时间，星期几的样式*/
.dateblock{
    width: 5rem;
    position: relative;
    font-size:.7rem;
    font-family:serif;
    font-weight:bold;
    text-align: center;
    color:white;
}
```

**涉及到的特性：**

- `transform-oragin`

调整指针的初始位置以及旋转的轴点:[transform-oragin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin)
    
```css
    transform:rotate(0deg);
    transform-origin:50% 100%; //这里旋转点是bottom
```

- `transform: rotate()`

## JS代码

```js
 //时分表每次移动没有过渡效果，仅仅根据角度来定旋转的位置，
//不用考虑354->0度的一个回旋BUG，若过渡时间过短会出现闪动。  
//左边时钟表盘部分
function left(){
    const secondHand = document.querySelector(".second-hand");
    const minHand    = document.querySelector(".min-hand");
    const hourHand   = document.querySelector(".hour-hand");
    function updata(){
        const now = new Date();
        //秒针的旋转计算
        const seconds               =  now.getSeconds();
        const secondsDegrees        =  seconds*6;
        secondHand.style.transform  =  `rotate(${secondsDegrees}deg)`;
        //分针旋转的计算
        const mins                =  now.getMinutes();
        const minsDegrees         =  (mins*6)+(seconds/60)*6;
        minHand.style.transform   =  `rotate(${minsDegrees}deg)`;
        //时针旋转的计算
        const hours               =  now.getHours();
        const hoursDegrees        =  (hours-12)*30+(mins/60)*30;
        hourHand.style.transform  =  `rotate(${hoursDegrees}deg)`;

    }
    setInterval(updata,1000);
    updata();
}
//右边电子日历部分
 function right(){
    const DATE = document.querySelector(".date");
    const WEEK = document.querySelector(".week");
    const TIME = document.querySelector(".time");
    function Adate(){
      const now = new Date();
      const weekList = ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"];
      const str = now.getFullYear()+"-"+now.getMonth()+"-"+now.getDay();
      DATE.innerHTML = str;
      WEEK.innerHTML = weekList[now.getDay()];
    }
    Adate();
    setInterval(Adate,24*3600);

    // 分钟，秒，不足两位时，用0进行凑位。
    function zero(arg){
      if(arg>=10){
        return arg;
      }else{
        return "0"+arg;
      }
    }
    // 显示当前时间的函数
    function Atime(){
      const now = new Date();
      const str = now.getHours()+":"+zero(now.getMinutes())+":"+zero(now.getSeconds());
      TIME.innerHTML=str;
    }
    Atime();
    setInterval(Atime,1000);
}
  left();
  right();

```

- 获取秒针、分钟、小时节点

```js
    const secondHand = document.querySelector(".second-hand");
    const minHand    = document.querySelector(".min-hand");
    const hourHand   = document.querySelector(".hour-hand");
```

- 获取当前时间秒、分、小时

```js
const now = new Date();
const seconds = now.getSeconds();
const mins = now.getMinutes();
const hours = now.getHours();
```

- 计算秒、分、小时角度

```js
const secondsDegrees        =  seconds*6;
const minsDegrees         =  (mins*6)+(seconds/60)*6;
const hoursDegrees        =  (hours-12)*30+(mins/60)*30;
```

- 根据角度设置样式

```js
secondHand.style.transform  =  `rotate(${secondsDegrees}deg)`;
minHand.style.transform   =  `rotate(${minsDegrees}deg)`;
hourHand.style.transform  =  `rotate(${hoursDegrees}deg)`;
```

- 设置定时器，每秒调用一次`setDate`函数

```js
   setInterval(updata,1000);
```
