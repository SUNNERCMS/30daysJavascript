# Day02 - JavaScript + CSS Clock

## 简介
第二天的练习是用JS+CSS模拟时钟效果。

效果如下：
![clock](https://github.com/SUNNERCMS/30daysJavascript/blob/master/02%20-%20JS%20and%20CSS%20Clock/image/GIF.gif)
实现以上模拟时钟的效果，大致思路和解决方案如下：
* 分别获取到当前时间的时、分、秒。
* 通过时分秒对一圈360度，进行映射，确定每一个指针所需旋转的角度。
* 通过CSS的`transform：rotate(deg)`，来实时的调整指针在键盘中的位置。

## 页面布局

```html
  <div class="clock">
    <div class="clock-face">
      <div class="hand hour-hand"></div>
      <div class="hand min-hand"></div>
      <div class="hand second-hand"></div>
    </div>
  </div>
```

## CSS样式

```css
  <style>
    html {
      background: #018DED url(http://unsplash.it/1500/1000?image=881&blur=50);
      background-size: cover;
      font-family: 'helvetica neue';
      text-align: center;
      font-size: 10px;
    }

    body {
      margin: 0;
      font-size: 2rem;
      display: flex;
      flex: 1;
      min-height: 100vh;
      align-items: center;
    }

    .clock {
      width: 30rem;
      height: 30rem;
      border: 20px solid white;
      border-radius: 50%;
      margin: 50px auto;
      position: relative;
      padding: 2rem;
      box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.1),
      inset 0 0 0 3px #EFEFEF,
      inset 0 0 10px black,
      0 0 10px rgba(0, 0, 0, 0.2);
    }

    .clock-face {
      position: relative;
      width: 100%;
      height: 100%;
      transform: translateY(-3px);
      /* account for the height of the clock hands */
    }

    .hand {
      width: 50%;
      height: 6px;
      background: black;
      position: absolute;
      top: 50%;
      transform-origin: 100%;
      transform: rotate(90deg);
      transition: all 0.05s;
      transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1);
    }
  </style>
```

**涉及到的特性：**

- `transform-oragin`

调整指针的初始位置以及旋转的轴点:[transform-oragin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin)
    
```css
transform-oragin: 100%; //初始化使三个指针全部指向12时
```

- `transform: rotate()`

设置旋转角度

- `transition`

```css
transition: all //0.05s;设置动画时间为0.05秒
```
    
- `transition-timing-function: cubic-bezier(x, x, x, x)`

设置 `transition-time-function` 的值，以实现秒针“滴答滴答”的效果。此外注意 `transform` 中的 `rotate` （旋转）属性由角度来控制，可以试着在页面上修改这个参数来查看效果。


![](http://om1c35wrq.bkt.clouddn.com/day21.gif)


## JS代码

```js
  <script>
    const secondHand = document.querySelector('.second-hand');
    const minsHand = document.querySelector('.min-hand');
    const hourHand = document.querySelector('.hour-hand');

    function setDate() {
      const now = new Date();

      const seconds = now.getSeconds();
      const secondsDegrees = ((seconds / 60) * 360) + 90;
      secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

      const mins = now.getMinutes();
      const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90;
      minsHand.style.transform = `rotate(${minsDegrees}deg)`;

      const hour = now.getHours();
      const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90;
      hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    }

    setInterval(setDate, 1000);

    setDate();
  </script>
```

- 获取秒针、分钟、小时节点

```js
    const secondHand = document.querySelector('.second-hand');
    const minsHand = document.querySelector('.min-hand');
    const hourHand = document.querySelector('.hour-hand');
```

- 获取当前时间秒、分、小时

```js
const now = new Date();
const seconds = now.getSeconds();
const mins = now.getMinutes();
const hour = now.getHours();
```

- 计算秒、分、小时角度

```js
const secondsDegrees = ((seconds / 60) * 360) + 90;
const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90;
const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90;
```

- 根据角度设置样式

```js
secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
minsHand.style.transform = `rotate(${minsDegrees}deg)`;
hourHand.style.transform = `rotate(${hourDegrees}deg)`;
```

- 设置定时器，每秒调用一次`setDate`函数

```js
setInterval(setDate, 1000);
```


