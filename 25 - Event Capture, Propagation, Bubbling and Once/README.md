

# Day25 - Event Capture, Propagation, Bubbling and Once


## 效果图


![](http://om1c35wrq.bkt.clouddn.com/Snip20170813_2.png)

第25天的训练是学习DOM的事件机制，主要包括事件捕获，事件冒泡，单次执行事件。



## 源代码

[addEventListener参考文档](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)

```Javascript
 <script>
        let divs = document.querySelectorAll('div');
        let one = document.querySelector('.one');
        let two = document.querySelector('.two');
        let three = document.querySelector('.three');
        divs.forEach(div => div.addEventListener('click', logText, {
            once: true,
            capture: false
        }));

        // one.addEventListener('click', logText1, {
        //     // capture: true
        // });
        // two.addEventListener('click', logText2, {
        //     // capture: true
        // });
        // three.addEventListener('click', logText3, {
        //     capture: true
        // });

       
        function logText(e) {
            console.log(this.classList.value);
            // e.stopPropagation();
        }

        function logText1(e) {
            console.log(this.classList.value);
            // e.stopPropagation();
        }

        function logText2(e) {
            console.log(this.classList.value);
            // e.stopPropagation();
        }

        function logText3(e) {
            console.log(this.classList.value);
            e.stopPropagation();
        }
        
</script>
```
同时也看一下HTML的文档结构，对于事件机制的理解也很重要：

```html
<div class="one">
    <div class="two">
        <div class="three">
        </div>
    </div>
</div>
```
* `EventTarget.addEventListener('eventName',callback,option)`：元素的事件注册方法，接收三个参数，第一个参数为事件的名称（点击`click`、双击`dbclick`、改变`change`等），第二个参数是该事件的回调函数，也称为监听器，第三个参数为事件注册的选项对象，通常会包含两个配置项（是否事件捕获`capture`以及单次执行`once`事件，它们两个的默认值都是`false`）。
* 当我们点击`class="three"`的`div`的时候，我们也相当于同时点击了`class="two"`和`class="one"`。
* `e.stopPropagation();`是否停止冒泡，如果调用了这个方法，就不会触发父组建的方法。





