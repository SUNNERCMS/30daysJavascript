# Day22 - 鼠标锚点动画生成指南

## 效果图
![](https://github.com/SUNNERCMS/30daysJavascript/blob/master/22%20-%20Follow%20Along%20Link%20Highlighter/SHOWGIF.gif)

第22天的练习是一个动画练习，当鼠标移动到锚点处，会有一个白色的色块移动到当前锚点所在的位置。演示图如下所示：

### 解决思路：  
实际上是通过一个背景颜色Wie白色的小块进行覆盖导航元素这个白色小块的宽高及位置有getBoundingClientRect来获取，鼠标进入不同的元素就获取该元素的宽高和位置数据，然后赋值给这个白色小块，则白色小块定位到该元素位置处，作为背景来使用。


## JS源码

```js
    <script>
        let A=[...document.querySelectorAll("a")];
        A.forEach(item=>item.addEventListener("mouseenter",addHightLight));
        //创建类名为hightLight的白色小块 -->
        let SPAN=document.createElement("span");
        SPAN.setAttribute("class","hightlight");
        document.body.appendChild(SPAN);
        SPAN.style.display="none";

        function addHightLight(){
            let RECT=this.getBoundingClientRect();
            let rects={
                width:RECT.width,
                height:RECT.height,
                left:RECT.left+window.scrollX,
                top:RECT.top+window.scrollY
            }
            // SPAN.style=`width:${rects.width},height:${rects.height},left:${rects.left},top:${rects.top}`;
            // SPAN.style.top=
            // SPAN.style.width = `${rects.width}px`;
            // SPAN.style.height = `${rects.height}px`;
            // // SPAN.style.transform = `translate(${rects.left}px, ${rects.top}px)`;用了位置移动，等价于下面的这两条语句
            // SPAN.style.left = `${rects.left}px`;
            // SPAN.style.top = `${rects.top}px`;
            // SPAN.style.display="block";
// 采用cssText写法片段式样式改变，可以减少回流和重绘，上述的语句没改变一个样式都会触发回流和重绘。
            SPAN.style.cssText=`width:${rects.width}px;height:${rects.height}px;left:${rects.left}px;top:${rects.top}px;display:block;`;

        }
    </script>
```

## 代码解析

- 通过HTML源码我们不难发现，所有锚点都是由`a`标签组成，所以在`js`代码中我们首先先获取所有的`a`标签对象，返回一个伪数组，用扩展运算符将其真正数组化，将其存储到`triggers`变量中，然后给每个a标签添加鼠标进入监听事件。

```js
        let A=[...document.querySelectorAll("a")];
        A.forEach(item=>item.addEventListener("mouseenter",addHightLight));
```
- 在效果图中高亮状态的小块其实就是一个`span`标签，在JS代码中创建了一个`span`标签，并且为其添加了一个`highlight`的`class`，由于hightlight的样式中
是绝对定位，并且top和left的值均为0；那么在初始化时是位于左上角的，通过display进行隐藏，然后在改变之后在进行显示，中间加上过渡效果。
```js
       //创建类名为hightLight的白色小块 -->
        let SPAN=document.createElement("span");
        SPAN.setAttribute("class","hightlight");//或者使用SPAN.classList.add("hightlight");
        document.body.appendChild(SPAN);
        SPAN.style.display="none"; 
```

- `getBoundingClientRect()`

[getBoundingClientRect](https://blog.csdn.net/qq_39207948/article/details/88147479)

`Element.getBoundingClientRect()`方法返回元素的大小及其相对于视口的位置。

**语法：**

```js
rectObject = object.getBoundingClientRect();
```

**值：**
返回值是一个 [DOMRect](https://developer.mozilla.org/zh-CN/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIDOMClientRect) 对象，这个对象是由该元素的 [getClientRects()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getClientRects) 方法返回的一组矩形的集合, 即：是与该元素相关的CSS 边框集合 。

**DOMRect属性表：**

|属性|类型|描述|
|:-----------|:-----------:|:-----------|
|bottom|float|Y 轴，相对于视口原点（viewport origin）矩形盒子的底部。**只读**。 |
|height|float|矩形盒子的高度（等同于 bottom 减 top）。**只读**。|
|left|float|X 轴，相对于视口原点（viewport origin）矩形盒子的左侧。**只读**。 |
|right|float|X 轴，相对于视口原点（viewport origin）矩形盒子的右侧。**只读**。 |
|top|float|Y 轴，相对于视口原点（viewport origin）矩形盒子的顶部。**只读**。|
|width|float|矩形盒子的宽度（等同于 right 减 left）。**只读**。 |
|x|float|X轴横坐标，矩形盒子左边相对于视口原点（viewport origin）的距离。**只读**。|
|y|float|Y轴纵坐标，矩形盒子顶部相对于视口原点（viewport origin）的距离。**只读**。|


`DOMRect` 对象包含了一组用于描述边框的只读属性——left、top、right和bottom，单位为像素。除了 width 和 height 外的属性都是相对于视口的左上角位置而言的。

![](http://om1c35wrq.bkt.clouddn.com/day22-rect.png)

空边框盒（译者注：没有内容的边框）会被忽略。如果所有的元素边框都是空边框，那么这个矩形给该元素返回的 width、height 值为0，left、top值为第一个css盒子（按内容顺序）的top-left值。

当计算边界矩形时，会考虑视口区域（或其他可滚动元素）内的滚动操作，也就是说，当滚动位置发生了改变，top和left属性值就会随之立即发生变化（因此，它们的值是相对于视口的，而不是绝对的）。如果不希望属性值随视口变化，那么只要给top、left属性值加上当前的滚动位置（通过window.scrollX和window.scrollY），这样就可以获取与当前的滚动位置无关的常量值。

- `highlightLink`方法

```js
    function addHightLight(){
        let RECT=this.getBoundingClientRect();  
        let rects={
            width:RECT.width,
            height:RECT.height,
            left:RECT.left+window.scrollX,
            top:RECT.top+window.scrollY
        }
        // SPAN.style=`width:${rects.width},height:${rects.height},left:${rects.left},top:${rects.top}`;
        // SPAN.style.top=
        // SPAN.style.width = `${rects.width}px`;
        // SPAN.style.height = `${rects.height}px`;
        // // SPAN.style.transform = `translate(${rects.left}px, ${rects.top}px)`;用了位置移动，等价于下面的这两条语句
        // SPAN.style.left = `${rects.left}px`;
        // SPAN.style.top = `${rects.top}px`;
        // SPAN.style.display="block";
// 采用cssText写法片段式样式改变，可以减少回流和重绘，上述的语句没改变一个样式都会触发回流和重绘。
        SPAN.style.cssText=`width:${rects.width}px;height:${rects.height}px;left:${rects.left}px;top:${rects.top}px;display:block;`;

    }
```
> 给a元素添加高亮背景的函数。获取到当前进入的a元素，然后将该元素的top\left\width\height用一个对象进行保存。然后将span的白色小块的样式位置进行改变，移动到鼠标进入的这个元素。  


- <nav> 标签定义导航链接的部分。  

并不是所有的 HTML 文档都要使用到 <nav> 元素。<nav> 元素只是作为标注一个导航链接的区域。
## 所有的工作做完，上面的这套程序存在bug，当鼠标进入一个页面，出现白色背景块时，此时改变页面的大小，白色背景块的位置出现错位，相对于视口的位置不改变。
