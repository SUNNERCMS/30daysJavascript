# Day16 - 鼠标移动让文字出现🌈效果中文指南

## 效果图
![](https://github.com/SUNNERCMS/30daysJavascript/blob/master/16%20-%20%E7%A7%BB%E5%8A%A8%E9%BC%A0%E6%A0%87%E8%AE%A9%E5%AD%97%E4%BD%93%E5%91%88%E7%8E%B0%E5%BD%A9%E8%99%B9%E6%95%88%E6%9E%9C/show.PNG)

鼠标移动时，元素的字体阴影随着鼠标移动的方向发生改变，达到字体阴影随着鼠标一起走的效果。
## 基础知识
#### text-shadow
  `text-shadow: h-shadow v-shadow blur color; `
`none`：无阴影
`<length>`①：第1个长度值用来设置对象的阴影水平偏移值。可以为负值
`<length>`②：第2个长度值用来设置对象的阴影垂直偏移值。可以为负值
`<length>`③：如果提供了第3个长度值则用来设置对象的阴影模糊值。不允许负值
`<color>`：设置对象的阴影的颜色。

#### 解构赋值
> [参考文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

解构赋值（destructuring assignment）语法是一个Javascript表达式，它使得从数组或者对象中提取数据赋值给不同的变量成为可能。

```js
let a, b, rest;

/* array 解构赋值 */
[a, b] = [1, 2];
console.log(a); // 1
console.log(b); // 2

[a, b, ...rest] = [1, 2, 3, 4, 5];
console.log(a); // 1
console.log(b); // 2
console.log(rest); // [3, 4, 5]

/* object 解构赋值:这里的小括号不能掉 */
({a, b} = {a:1, b:2});
console.log(a); // 1
console.log(b); // 2

/* object & ...rest 解构赋值 */
({a, b, ...rest} = {a:1, b:2, c:3, d:4});
// {a: 1, b: 2, c: 3, d: 4}

rest;
// {c: 3, d: 4}
```
#### MouseEvent

![](http://om1c35wrq.bkt.clouddn.com/D6300A0F-CD68-4CE2-AEB7-22DF2CA6FF3F.png)
[https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageY](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)

[clientX](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientX) 设置或获取鼠标指针位置相对于当前窗口的 x 坐标，其中客户区域不包括窗口自身的控件和滚动条。  
[clientY](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientY) 设置或获取鼠标指针位置相对于当前窗口的 y 坐标，其中客户区域不包括窗口自身的控件和滚动条。  
[offsetX](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/offsetX) 设置或获取鼠标指针位置相对于触发事件的对象的 x 坐标。  
[offsetY](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/offsetY) 设置或获取鼠标指针位置相对于触发事件的对象的 y 坐标。 
[screenX](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/screenX) 设置或获取获取鼠标指针位置相对于用户屏幕的 x 坐标。  
[screenY](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/screenY) 设置或获取鼠标指针位置相对于用户屏幕的 y 坐标。  
[x](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/x) 设置或获取鼠标指针位置相对于父文档的 x 像素坐标(亦即相对于当前窗口)。  
[y](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/y) 设置或获取鼠标指针位置相对于父文档的 y 像素坐标(亦即相对于当前窗口)。  
[pageX](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageX) 设置或获取指针位置相对于整个文档的x坐标  
[pageY](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageY) 设置或获取指针位置相对于整个文档的y坐标  

#### 页面元素offset的几个属性示例

* HTMLElement.offsetParent：是一个只读属性，指向最近的包含该元素的定位元素.如果没有定位的元素，则 offsetParent 为最近的 table 元素对象或根元素（标准模式下为 html；quirks 模式下为 body）。当元素的 style.display 设置为 "none" 时，offsetParent 返回 null。
offsetParent 很有用，因为 _offsetTop_ 和 _offsetLeft_ 都是相对于其内边距边界的。  
* HTMLElement.offsetTop：指的是当前元素到其offsetParent指向元素的__上边距__的距离。    
* HTMLElement.offsetLeft：指的是当前元素到其offsetParent指向元素的__左边距__的距离。  
* HTMLElement.offsetHeight：指的是当前元素的__高度__，包含__content，padding，border__的高度值，但不包括__margin__的值。  
* HTMLElement.offsetWidth：指的是当前元素的__宽度__，包含__content，padding，border__的高度值，但不包括__margin__的值。  

## js代码

```javascript
const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');
const walk = 40;  // 鼠标左右移动共移动的距离

function draw(e){
  const { offsetWidth: width, offsetHeight: height} = hero;
  let { offsetX: x, offsetY: y} = e;

  // 使鼠标移动到中间元素上，x、y的值连续变化
  if(e.target !== this){
  // if(e.target == text){
    x = x + e.target.offsetLeft;
    y = y + e.target.offsetTop;
  }
  // const xaisx = (x/width*walk)-(walk/2);
  // const yaisx = (y/height*walk)-(walk/2);
  const xaisx = Math.floor((x/width*walk)-(walk/2));
  const yaisx = Math.floor((y/height*walk)-(walk/2));
  text.style.textShadow = `
    ${xaisx}px ${yaisx * -1}px 2px rgba(0,255,0,0.7),
    ${xaisx * -1}px ${yaisx}px 2px rgba(255,0,0,0.7),
    ${yaisx}px ${xaisx * -1}px 2px rgba(188,188,188,0.7),
    ${yaisx * -1}px ${xaisx}px 2px rgba(0,0,255,0.7)      
    `; // 多写几个就有了霓虹灯的效果
}
hero.addEventListener('mousemove',draw);
```
* 分别获取到鼠标所在位置相对于页面左侧和顶端的距离，将这两个距离映射为自己想要移动的距离上（`walk`）；
* 其中当鼠标移动中间的文字上的时候，由于`e.target`变化了，所以造成x的值不连续，因此需要监测`e.target`的值，判断是否指在了文字上；
* 为元素设置字体阴影，text-shadow样式，也可以设置多个，达到类似霓虹灯的效果；
* 对元素添加`mousemove`事件。


