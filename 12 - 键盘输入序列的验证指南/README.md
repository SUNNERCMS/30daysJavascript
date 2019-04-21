### Day12 - 键盘输入序列的验证指南

#### 项目效果

![](https://github.com/SUNNERCMS/30daysJavascript/blob/master/12%20-%20%E9%94%AE%E7%9B%98%E8%BE%93%E5%85%A5%E5%BA%8F%E5%88%97%E7%9A%84%E9%AA%8C%E8%AF%81%E6%8C%87%E5%8D%97/GIF.gif)

文档里提供了一个 `script` 标签，供我们从 [Cornify.com](https://www.cornify.com/) 加载一个 JS 文件，调用其中的 `cornify_add()` 方法时，会在页面中追加 `p` 标签，并在 DOM 中插入一个图标。Cornify 的具体效果如上所示。  
#### 实现功能：  
- 可以在输入区输入内容，且内容长度为5，在匹配区中显示输入内容，长度为4,当匹配到暗码字段时，会调用`cornify_add()`,在页面中添加一个独角兽或者彩虹特效。

#### 解决思路
1. 指定可激发特效的字符串
2. 监测字符串变化
3. 事件监听
4. 正则表达式判断字符串输入 
5. 处理输入，在符合条件时，调用 `cornify_add()`

#### 代码分析
1、获取元素和事件监听
```
        let input=document.querySelector(".text");
        let show= document.querySelector(".show");
        input.addEventListener('keyup',debounce(handle,300));
```
2、对键盘输入事件进行防抖处理，避免过度调用回调函数
```
        // 防抖处理
        function debounce(func,wait){
            let timeflag;  
            return function(){
                clearTimeout(timeflag); //清除300ms之内之前触发的定时器。
                let arg=arguments;
                let _this = this;
                timeflag = setTimeout(func.bind(_this,arg),wait);
            }
        }
```
> 防抖的主要思路：用一个函数对回调函数和等待时间进行包装，这个包装函数需要在等待时间到达后返回这个回调函数，这里可以使用setTimeout函数实现，需要注意的是需要设置一个时间变量来保存定时器，在wait等待时间之内再次触发监听事件，说明上一个的定时器还存在，需要将它清除。这里的防抖代码解决了this指向和event队象的问题，如果对这块不了解，详解见https://github.com/mqyqingfeng/Blog/issues/22    

3、回调函数部分
```
        //回调函数
        function handle(){
            input.value=input.value.slice(-5);
            show.textContent=input.value.slice(-4);
            let regexp = /love/gi;
            if(regexp.test(show.textContent)){
                cornify_add();//这个方法是由通过script引入的cornify.com中的cornify.js提供的。
            }
        }
```


