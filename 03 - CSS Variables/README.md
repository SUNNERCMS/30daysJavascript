# Day03 - CSS 变量

## 实现效果

![](https://github.com/SUNNERCMS/30daysJavascript/blob/master/03%20-%20CSS%20Variables/GIF.gif)

## HTML源码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>CSS Variables</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h2>Update <span class="h1">CSS</span> Variables with <span class="h1">JS</span></h2>
    <div class="controls">
        <div class="wrap">
            <label for="spacing">Spacing:</label>
            <input type="range" id="spacing" min="10" max="200" value="10" onchange="spacingchange()">
        </div>
        <div class="wrap">
            <label for="blur">Blur:</label>
            <input type="range" id="blur" min="0" max="25" value="10" onchange="blurchange()">
        </div>
        <div class="wrap">
            <label for="base">Base Color:</label>
            <input type="color" id="base" name="base" value="#ffc600" onchange="basechange">
        </div>
    </div>
    <img id="img" src="http://f.hiphotos.baidu.com/lvpics/h=800/sign=b346032cbe389b5027ffed52b534e5f1/960a304e251f95ca545f8b84ce177f3e6709525d.jpg" alt="演示图片">
    <script src="variables.js"> </script>
</body>
</html>
```

## CSS源码

```css
:root{
    --spacing:10px;
    --blur:10px;
    --base:#ffc600;
    --fontsize:10px;
}

html,body{
    text-align:center;
    background: #193549;
    margin:0;
    padding:0;
    min-height: 100vh;
    font-size:calc(3*var(--fontsize));
    font-family:'helvetica neue', sans-serif; /*Helvetica是一种被广泛使用的的西文字体(铅字体）,用于印刷行业,Helvetica是苹果电脑的默认字体，微软常用的Arial字体也来自于它*/
    font-weight:900;/*设置字体粗细：100---900,400=normal,700=bolder*/
    color:white;
}

.h1{
    color:var(--base);
}
.controls{
    font-weight:100;
    margin-bottom:calc(5*var(--fontsize));
}
.controls .wrap{
    display: inline-block;
    margin:5px auto;
}
.controls .wrap label{
    margin-left:20px;
}
.controls .wrap input{
    position:relative;
    top:3px;
    width:calc(10*var(--fontsize));
}
.controls .wrap #base{
    top:-3px;
}
img{
    width:calc(60*var(--fontsize));
    height:calc(40*var(--fontsize));
    padding:var(--spacing);
    filter:blur(var(--blur));
    background-color:var(--base);/*背景颜色填充内容、内边距、边框，作为打底色*/
}
```


## JS源码

```js
function spacingchange(){
    var spacing=document.querySelector("#spacing");
    document.body.style.setProperty('--spacing', spacing.value+'px');
    // var img=document.querySelector("#img");
    // img.style.padding=spacing.value+'px';一个需要改变的元素可以将其取出，改变它的对应项，但有100个需要改变的元素时，改变根变量值最有效。
}
function blurchange(){
    var blur=document.querySelector("#blur");
    document.body.style.setProperty("--blur",blur.value+'px');
}
function basechange(){
    var base=document.querySelector("#base");
    document.body.style.setProperty("--base",base.value);
}
```

## 过程指南

### CSS 部分准备

1. 声明全局（`:root`）的 CSS 变量  
2. 将变量应用到页面中对应元素 `<img>`   
3. 处理标题的 CSS 值  

### JS 实时更新 CSS 值
1. 监听input的change改变函数，然后触发各自的事件处理函数    
2. 每个事件中，先取出该元素，然后设置CSS的原生变量值，进而下面的所有样式中凡是用到这个变量的值都跟着改变。  
改进：利用字符串模板+遍历添加事件的方法，给每一个input元素添加事件处理函数。  

## 基础知识

1. NodeList 和 Array 的区别

	可以打开 __proto__ 查看它的方法，其中有 `forEach()`、`item()`、`keys()` 等。而 Array 的 prototype 中有 `map()`、`pop()` 等数组才有的方法。
	
3. HTML5 中的自定义数据属性 `dataset`

	HTML5 中可以为元素添加非标准的自定义属性，只需要加上 `data-` 前缀，可以随便添加和命名。添加之后，可以通过元素的 `dataset` 属性来访问这些值，`dataset` 的值是 DOMStringMap 的一个实例化对象，其中包含之前所设定的自定义属性的“名-值”对。
	
4. [CSS variable](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_variables)

	这是一个 CSS3 的新特性，[IE 和 Edge 目前都还不支持](http://caniuse.com/#feat=css-variables)。命名写法是 `--变量名`，在引用这个变量时写法是 `var(--变量名)`。具体实例见下一条代码。
	
5. `:root` 伪类

	这个伪元素匹配的是文档的根元素，也就是 `<html>` 标签。
	
	所以常用于声明全局的 CSS 变量：
	
	```css
	:root {
	  --color: #fff;
	}
	```
	
	在使用时：
	
	```css
	img {
	  background: var(--base);
	}
	```
	
5. CSS 滤镜 [filter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter)

	CSS 的滤镜提供了一些图形特效，比如高斯模糊（blur）、锐化、变色等。它带有一些预设的函数，在使用时加上参数调用这些函数即可。[在 Chrome、Firefox 中都支持。](http://caniuse.com/#search=filter)  
6. `<input type="range">`HTML5中type属性之range   
range 输入类型用于应该包含指定范围值的输入字段。  
range 类型显示为滑块。  
您也可以设置可接受数字的限制：  
`<input type="range" name="points" min="1" max="10" />` 

|属性|值|描述|
|:---------:|:---------:|:---------:|
|max|number|规定允许的最大值。| 
|min|number|规定允许的最小值。| 
|step|number|规定合法数字间隔（如果 step="3"，则合法数字是 -3,0,3,6，以此类推）。| 
|value|number|规定默认值。|   

7. `<input type="color">`HTML5中type属性之color  
color输入类型用于规定颜色。  
该输入类型允许您从拾色器中选取颜色。  
实例：  
`Color: <input type="color" name="user_color" />`  
8. font-weight 属性设置文本的粗细。  
> normal	默认值。定义标准的字符。  
bold	定义粗体字符。  
bolder	定义更粗的字符。  
lighter	定义更细的字符。  
100,
200,
300,
400,
500,
600,
700,
800,
900:定义由粗到细的字符。400 等同于 normal，而 700 等同于 bold。  
inherit	规定应该从父元素继承字体的粗细。  
9. background-color 属性为元素设置一种纯色。  
这种颜色会填充元素的内容、内边距和边框区域，但不包括外边距。如果边框有透明部分（如虚线边框dashed），会透过这些透明部分显示出背景色。   
## 解决难点

1. **如何处理参数值（一个有 px 、另一个没有）**

	运用 `dataset` 储存后缀，有 px 后缀的标签中设置 `<input data-sizing: px>`：
	
	```html
	<input type="range" name="blur" min="0" max="25" value="10" data-sizing="px">
    <input type="color" name="base" value="#8aa8af">
	```
	
	JS 中通过 `dataset.sizing` 来获取后缀值：

	```javascript
	const suffix = this.dataset.sizing || ''; 
	```
	
	此时 suffix 获取到的值，针对颜色为空，而针对长度类的则为 'px'。
	
2. 	**如何用 JavaScript 改变 CSS 属性值？**

	在 JavaScript 中 `document.documentElement` 即代表文档根元素。所以要改变全局的 CSS 变量，可以这样写：
	
	```js
	document.documentElement.style.setProperty('--base', '#fff');
	```





