# Day08 - HTML5 Canvas 实现彩虹画笔绘画板指南

## 项目效果
![](https://github.com/SUNNERCMS/30daysJavascript/blob/master/08%20-%20HTML5%20Canvas%20%E5%AE%9E%E7%8E%B0%E5%BD%A9%E8%99%B9%E7%94%BB%E7%AC%94%E7%BB%98%E7%94%BB%E6%9D%BF/GIF.gif)

> 用 HTML5 中的 Canvas 的路径绘制实现一个绘画板，可供鼠标画画，颜色呈彩虹色渐变，画笔大小同样呈渐变效果。这部分不涉及 CSS 内容，全部由 JS 来实现。

## 涉及特性

Canvas：

- 模板骨架
- 基本属性
	- `getContext()`
	- `strokeStyle`
	- `lineCap`
	- `lineJoin`
- 路径绘制
	- `beginPath()`
	- `lineTo()`
	- `moveTo()`
	
鼠标事件处理：
- `mousemove`
- `mousedown`
- `mouseup`
- `mouseout`

## 过程指南

1. 获取 HTML 中的 `<canvas>` 元素，并设定宽度和高度
2. `.getContext('2d')` 获取上下文，下面以 ctx 表示
3. 设定 ctx 基本属性
	- 描边和线条颜色  
	- 线条宽度  
	- 线条末端形状  
4. 绘画效果
	1. 设定一个用于标记绘画状态的变量  
	2. 鼠标事件监听，不同类型的事件将标记变量设为不同值  
	3. 编写发生绘制时触发的函数，设定绘制路径起点、终点  
5. 线条彩虹渐变效果（运用 hsl 的 `h` 值的变化，累加）  
6. 线条粗细渐变效果（设定一个范围，当超出这个范围时，线条粗细进行逆向改变，利用[撞墙反弹程序](https://blog.csdn.net/qq_39207948/article/details/85252068)  

## Canvas相关知识

[Canvas_API](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)

### 代码部分
```JS
        //全局变量和初始值设置部分
        let drawflag=false; //用于区分鼠标点击事件和鼠标移动事件。
        let beginX=0;   //设置为全局变量，初始点要传到移动处理事件中。
        let beginY=0;
        let hue=0;      //hsl的色调初始值
        let context='';
        let lineWidth=60;
        let direction=true; //定义变量增加方向
	
        // 页面加载函数，在DOM结构解析完成后运行
        window.onload=function(){

            let canvas = document.querySelector("#tutorial");
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            context=canvas.getContext("2d");

            canvas.addEventListener("mousedown",beginlocation);
            canvas.addEventListener("mousemove",drawing);
            canvas.addEventListener("mouseup",()=>drawflag=false);
            canvas.addEventListener("mouseout",()=>drawflag=false);            
        }

```
- 页面加载函数中用的两个事件处理函数
```JS
 //设定初始点坐标，并开启绘图flag
        function beginlocation(e){
            beginX=e.offsetX;
            beginY=e.offsetY;
            drawflag=true;
        }
        //绘图函数：实际上一段一段的直线连接而成，鼠标每移动一点就将该时刻的坐标转换成下一次的起始坐标，而鼠标移动后的位置作为该段直线结束的坐标。
        function drawing(e){
            if(drawflag){
                let moveX=e.offsetX;
                let moveY=e.offsetY;

                //色相值改变
                if(hue<=360){  //hue要设置初始值
                    hue++;
                }else{
                    hue=0;
                }
                context.strokeStyle=`hsl(${hue},100%,50%)`;

                //“撞墙反弹程序”
                if(lineWidth>100||lineWidth<10){
                    direction = !direction;
                }
                if(direction){
                    lineWidth++;
                }else{
                    lineWidth--;
                }
                context.lineWidth=lineWidth;

                context.lineCap="round";
                context.lineJoin="round";

                context.beginPath();
                context.moveTo(beginX,beginY);
                context.lineTo(moveX,moveY);
                context.closePath();
                [beginX,beginY]=[moveX,moveY]; //es6解构赋值

                context.stroke();
            }else{
                return;
            }
        }
```

- canvas 元素

```js
<canvas id="tutorial"></canvas>
```

`canvas` 看起来和 `img` 元素很相像，唯一的不同就是它并没有 `src` 和`alt` 属性。实际上，`canvas` 标签只有两个属性——`width`和`height`。这些都是可选的，并且同样利用 `DOM properties` 来设置。当没有设置宽度和高度的时候，`canvas`会初始化宽度为`300`像素和高度为`150`像素。该元素可以使用CSS来定义大小，但在绘制时图像会伸缩以适应它的框架尺寸：如果CSS的尺寸与初始画布的比例不一致，它会出现扭曲。


- 渲染上下文（The rendering context）

```js
var canvas = document.getElementById('tutorial');
var ctx = canvas.getContext('2d');
```

`canvas`元素创造了一个固定大小的画布，它公开了一个或多个渲染上下文，其可以用来绘制和处理要展示的内容。

`canvas`起初是空白的。为了展示，首先脚本需要找到渲染上下文，然后在它的上面绘制。`canvas`元素有一个叫做 `getContext()` 的方法，这个方法是用来获得渲染上下文和它的绘画功能。`getContext()`只有一个参数，上下文的格式。对于2D图像而言，基本教程，你可以使用[CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D)

- 检查支持性

替换内容是用于在不支持 `canvas` 标签的浏览器中展示的。通过简单的测试`getContext()`方法的存在，脚本可以检查编程支持性。

```js
var canvas = document.getElementById('tutorial');

if (canvas.getContext){
    //支持
  var ctx = canvas.getContext('2d');
  // drawing code here
} else {
   //不支持
  // canvas-unsupported code here
}
```

### Canvas的简单实例
- [canvas 倒计时特效](https://blog.csdn.net/qq_39207948/article/details/85252925)
- [canvas 躁动的小球](https://blog.csdn.net/qq_39207948/article/details/85252947)
- [canvas 单个小球运动实验](https://blog.csdn.net/qq_39207948/article/details/85252849)

### 涉及知识点

[Canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)

#### canvas宽高设置
```js
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
```
#### 属性
- `lineCap`：笔触的形状，有 round | butt | square 圆、平、方三种。
- `lineJoin`：线条相交的样式，有 round | bevel | miter 圆交、斜交、斜接三种。
- `lineWidth`：线条的宽度
- `strokeStyle`：线条描边的颜色
#### 方法
- `beginPath()`：新建一条路径
- `stroke()`：绘制轮廓
- `moveTo()`：（此次）绘制操作的起点
- `lineTo()`：路径的终点

### 彩虹渐变颜色——HSL  

在这个挑战中，涉及到改变线条的颜色，如何实现彩虹的渐变效果？我们需要利用 HSL 色彩模式，首先可以去这个网站 [http://mothereffinghsl.com](http://mothereffinghsl.com/) 感受一下 HSL 不同色彩值对应的效果。
- H(hue) 代表色调，取值为 0~360，专业术语叫色相
- S 是饱和度，可以理解为掺杂进去的灰度值，取值为 0~1
- L 则是亮度，取值也是 0~1，或者百分比。
	
这之中 H 值从 0 到 360 的变化代表了色相的角度的值域变化，利用这一点就可以实现绘制时线条颜色的渐变了，只需要在它的值超过 360 时恢复到 0 重新累加即可。

```js
//色相值改变
if(hue<=360){  //hue要设置初始值
    hue++;
}else{
    hue=0;
}
context.strokeStyle=`hsl(${hue},100%,50%)`;
```

除此之外，如果想实现黑白水墨的颜色，可以将颜色设置为黑色，通过透明度的改变来实现深浅不一的颜色。

### 控制笔触大小

```js
	//“撞墙反弹程序”
	if(lineWidth>100||lineWidth<10){
	    direction = !direction;
	}
	if(direction){
	    lineWidth++;
	}else{
	    lineWidth--;
	}
	context.lineWidth=lineWidth;
```

上面的代码中，根据线条的宽度的变化来控制`direction`的值，根据`direction`的值来控制线宽是增加还是减少。


### 控制线条路径

```js
	context.beginPath();
	context.moveTo(beginX,beginY);
	context.lineTo(moveX,moveY);
	context.closePath();
	[beginX,beginY]=[moveX,moveY]; //es6解构赋值
```

### 事件监听代码逻辑分析

```js
    canvas.addEventListener("mousedown",beginlocation);
    canvas.addEventListener("mousemove",drawing);
    canvas.addEventListener("mouseup",()=>drawflag=false);
    canvas.addEventListener("mouseout",()=>drawflag=false);      
```

#### 需要整理知识点
- 1、鼠标事件有哪些，具体使用方法。  
- 2、获取窗口的高度与宽度(不包含工具条与滚动条):  
    var w=window.innerWidth;  
    var h=window.innerHeight;浏览器中地址导航栏下面中的部分  
    和clientWidth以及clientHeight的区别。  
    clientX和offsetX的区别  
      clientX检索与窗口客户区域有关的鼠标光标的X坐标，  
      offsetX 检索与触发事件的对象相关的鼠标位置的水平坐标   
    因为canvas的宽高均设置为了window.innerHtml和window.innerWidth,那么当点击鼠标时，实际上得到的是相对于canvas元素的位置，也即是e.offsetX/Y，这里offset中的set是小写。  

- 3、lineCap 属性设置或返回线条末端线帽的样式。  
    butt  默认。向线条的每个末端添加平直的边缘。  
    round   向线条的每个末端添加圆形线帽。  
    square  向线条的每个末端添加正方形线帽。  
- 4、lineJoin 属性设置或返回所创建边角的类型，当两条线交汇时。  
    bevel   创建斜角。  
    round   创建圆角。  
    miter   默认。创建尖角。  

