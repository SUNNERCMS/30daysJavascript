### Day13 - 图片随屏幕滚动而滑入滑出的效果
#### 项目效果
![](https://github.com/SUNNERCMS/30daysJavascript/blob/master/13%20-%20%E5%9B%BE%E7%89%87%E9%9A%8F%E5%B1%8F%E5%B9%95%E6%BB%9A%E5%8A%A8%E8%80%8C%E6%BB%91%E5%85%A5%E6%BB%91%E5%87%BA%E7%9A%84%E6%95%88%E6%9E%9C/demoshow/GIF.gif)  
实现页面内伴随着鼠标滚动，到每个图片时图片出现，并伴随着动画出现。
#### 实现思路
- 1、判断图片的滑出和滑入的位置（JS实现）  
- 2、根据位置来决定图片的过渡效果（CSS实现）
### 代码解析
#### JS部分
```JS
	let imgs=Array.from(document.querySelectorAll("img"));//转换为真正的数组
        window.addEventListener("scroll",throttle(handle,100));
        // 节流函数（定时器实现方式）
        function throttle(func,wait){
            let timeflag;
            return function(){
                let content=this;
                let args=arguments;
                if(!timeflag){
                    timeflag=setTimeout(function(){
                        timeflag=null;
                        func.apply(content,args)
                    },wait);
                }
            }

        }
        // 事件处理函数，每2秒执行一次，停止后也会执行一次。（无首有尾）
        // 判断图片位置的函数，遍历每一个图片，判断每一个图片是否出现在视图中，来决定是否加类。
        function handle(){
          imgs.forEach(img=>{
            let imgHalfBoolean=(window.scrollY+window.innerHeight)>img.offsetTop+img.height/2;//图片划过一半的判断条件
            let imgFullBoolean=window.scrollY<img.offsetTop+img.height;//图片没有完全滑入顶部的判断条件
            // 图片滑出一半且没有完全滑出时，加上过渡类
            if(imgHalfBoolean&&imgFullBoolean){
              img.classList.add("active");
            }else{
              img.classList.remove("active");
            }
          })
        }
```
##### 代码知识点分析  
- 1、节流处理： 此外由于每次滚动都触发监听事件，会降低 JavaScript 运行性能，所以用 throttle 函数来降低触发的次数。  
- 2、图片位置的确定：主要通过四个距离值  
(1)window.scrollY:页面滚动过的距离。  
(2)window.innerHeight:浏览器的视距，不包括上下工具栏。   
(3)img.offsetTop:图片相对于父元素的距离。  
(4)img.height:图片自身的高度值。  
详细的解释如下图：  
![](https://github.com/SUNNERCMS/30daysJavascript/blob/master/13%20-%20%E5%9B%BE%E7%89%87%E9%9A%8F%E5%B1%8F%E5%B9%95%E6%BB%9A%E5%8A%A8%E8%80%8C%E6%BB%91%E5%85%A5%E6%BB%91%E5%87%BA%E7%9A%84%E6%95%88%E6%9E%9C/demoshow/demo.PNG)
```JS
	let imgHalfBoolean=(window.scrollY+window.innerHeight)>img.offsetTop+img.height/2;//图片划过一半的判断条件
        let imgFullBoolean=window.scrollY<img.offsetTop+img.height;//图片没有完全滑入顶部的判断条件
```
其中橙色半透明部分指可滚动页面整体，橙色标注部分是指会随着页面滚动而变化的尺寸，黑色标注的尺寸是固定不变的。 页面的滑动过程经过了两个临界点，一个是下滑到图片的一半处，另一个是完全滑过图片使图片已不再视窗之内，分别决定了图片的显示和隐藏。
#### CSS部分
```CSS
html{
    box-sizing:border-box;
    background: linear-gradient(silver,#ffc600);
    font-family: 'helvetica neue';
    font-size:20px;
    font-weight: 200;
}
body{
    padding:0;
    margin:0;
}
*,*:before,*:after{
    box-sizing:inherit;
}
h1{
    margin-top:0;
}
.site-wrap{
    max-width:700px;
    margin:100px auto;
    background: whitesmoke;
    padding:40px;
    /*text-align:justify;text-align 属性规定元素中的文本的水平对齐方式。*/
}
p{
    text-indent:2em; /*text-indent 属性规定文本块中首行文本的缩进。*/
    word-break:break-all;
}
/* 图片的位置设置 */
.align-left{
    float:left;
    margin-right:30px;
}
.align-right{
    float:right;
    margin-left:30px;
}
/* 所有的图片处于隐藏状态，并将所有的属性改变设置为0.5s的过渡效果 */
.slide-in {
  opacity:0;
  transition:all .1s;
}
/* 位于左侧和右侧图片的额初始位置和大小状态 */
.align-left.slide-in{
  transform:translateX(-30%) scale(0.9);
}
.align-right.slide-in{
  transform: translate(30%) scale(0.9);
}
/* 具有active类的图片效果 */
.slide-in.active{
  opacity: 1;
  transform: translate(0%) scale(1);
}
```
