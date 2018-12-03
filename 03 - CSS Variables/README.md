# Day03 - CSS 变量

## 实现效果

![liyuechun](http://om1c35wrq.bkt.clouddn.com/day3.gif)


用 JavaScript 和 CSS3 实现拖动滑块时，实时调整图片的内边距、模糊度、背景颜色，同时标题中 JS 两字的颜色也随图片背景颜色而变化。

## 涉及特性

- [`:root`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:root)
- `var(--xxx)`：CSS 变量（[CSS Variables](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_variables)）
- `filter: blur()`
- 事件 `change`、`mousemove`


## HTML源码

```html
  <h2>Update CSS Variables with <span class='hl'>JS</span></h2>

  <div class="controls">
    <label for="spacing">Spacing:</label>
    <input id="spacing" type="range" name="spacing" min="10" max="200" value="10" data-sizing="px">

    <label for="blur">Blur:</label>
    <input id="blur" type="range" name="blur" min="0" max="25" value="10" data-sizing="px">

    <label for="base">Base Color</label>
    <input id="base" type="color" name="base" value="#ffc600">
  </div>


  <div class="result">
    <div class="showText">{spacing:<label id="label_spacing">#ffc600</label>}</div>
    <div class="showText">{blur:<label id="label_blur">10px</label>}</div>
    <div class="showText">{base:<label id="label_base">10px</label>}</div>
  </div>


  <img src="http://f.hiphotos.baidu.com/lvpics/h=800/sign=b346032cbe389b5027ffed52b534e5f1/960a304e251f95ca545f8b84ce177f3e6709525d.jpg">
```

## CSS源码

```css
  <style>
     :root {
      --base: #ffc600;
      --spacing: 10px;
      --blur: 10px;
    }

    img {

      width: 600px;
      height: 400px;
      padding: var(--spacing);
      background: var(--base);
      filter: blur(var(--blur));
    }

    .hl {
      color: var(--base);
    }
    /*
      misc styles, nothing to do with CSS variables
    */

    body {
      text-align: center;
      background: #193549;
      color: white;
      font-family: 'helvetica neue', sans-serif;
      font-weight: 100;
      font-size: 30px;
    }

    .controls {
      margin-bottom: 50px;
    }

    input {
      width: 100px;
    }

    .result {
      display: flex;
      flex-direction: row;
      justify-content: center;
      color: var(--base);
    }

    .showText {
      margin: 0px 25px 50px 25px;
    }
  </style>
```


## JS源码

```js
  <script>
    const inputs = document.querySelectorAll('.controls input');

    function handleUpdate() {
      const suffix = this.dataset.sizing || '';
      document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
      document.getElementById(`label_${this.name}`).innerText = this.value + suffix;
    }

    inputs.forEach(input => input.addEventListener('change', handleUpdate));
    inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
  </script>
```


## 过程指南

### CSS 部分准备

1. 声明全局（`:root`）的 CSS 变量
2. 将变量应用到页面中对应元素 `<img>` 
3. 处理标题的 CSS 值

### JS 实时更新 CSS 值
1. 获取页面中 `input` 元素
2. 给每个 `input` 添加监听事件，使其在值变动，触发更新操作
3. 同 2 ，添加鼠标滑过时的事件监听
4. 编写处理更新操作的方法
	1.  获取参数值后缀
	- 获取参数名（blur、spacing、color）
	- 获取参数值（12px、#efefef）
	- 赋值给对应的 CSS 变量

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

	CSS 的滤镜提供了一些图形特效，比如高斯模糊、锐化、变色等。它带有一些预设的函数，在使用时加上参数调用这些函数即可。[在 Chrome、Firefox 中都支持。](http://caniuse.com/#search=filter)  
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
100  
200
300
400
500
600
700
800
900  定义由粗到细的字符。400 等同于 normal，而 700 等同于 bold。
inherit	规定应该从父元素继承字体的粗细。
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





