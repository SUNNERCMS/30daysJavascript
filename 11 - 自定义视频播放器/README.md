# Day11 - 自定义视频播放器

## 效果展示
![](https://github.com/SUNNERCMS/30daysJavascript/blob/master/11%20-%20%E8%87%AA%E5%AE%9A%E4%B9%89%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E5%99%A8/GIF.gif)

第十一天是要做一个自定义的视频播放器，在具有基本样式的前提下，实现视频的播放，暂停，进度条拖拽，音量加减，播放速度加减，快进快退的功能。

## 实现思路
1. 首先需要分别将变量绑定至页面上的元素
2. 分别实现播放，暂停，声音加减，播放速度加减，拖拽快进，点击快进等函数
3. 事件绑定，将页面元素绑定相应触发事件

## CSS部分解读
- 视频播放器控制台隐藏弹出的设置  
```CSS
/*控制台的样式设置*/
.player__controls {
  display:flex;   /*弹性布局，子元素生效*/
  position: absolute;
  bottom:0;
  width: 100%;
  transform: translateY(100%) translateY(-5px);
  transition:all .3s;
  flex-wrap:wrap;   /*运行flex的子元素进行灵活的换行布局*/
  background:rgba(0,0,0,0.1);
}

.player:hover .player__controls {
  transform: translateY(0);  /*这里将控制台显示出来*/
}
/*当有鼠标悬停视频播放器时，控制台弹出，此时设置进度条高度为15px*/
.player:hover .progress {
  height:15px;
}
```
> 隐藏露头功能（天猫界面趴着那只猫，只露了个眼睛，悬停会跳出来，就可以据此来模拟实现）  
transform: translateY(100%) translateY(-5px);  
这里的控制台有一定的高度，translateY(100%)，是为了将控制台通过位移结合overflow：hidden进行完全隐藏， 然后translateY（-5px）,是为了将控制台顶部高度为5px的控制条，向上移动然后将其显示出来。  

- input的range类型：[滑动条的自定义样式设置](https://blog.csdn.net/qq_39207948/article/details/85880391)

## 变量绑定
HTML 元素中，`video` 标签是我们的视频，而下面的 `player__controls` 就是我们自己的控制面板

```html
    <div class="player">

        <video class="player__video viewer" src="./mp4/demo.mp4" loop>您的浏览器不支持播放该视频！</video>

        <div class="player__controls">
            <div class="progress">
                <div class="progress__filled"></div>
            </div>
            <button class="player__button toggle" title="Toggle Play">►</button>
            <input type="range" name="volume" class="player__slider" min=0 max="1" step="0.05" value="1" title="音量">
            <input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1" title="播放速度">
            <button data-skip="-5" class="player__button">« 5s</button>
            <button data-skip="5"  class="player__button">5s »</button>
        </div>
    </div>
```

开始之前我们先把所有需要用到的元素节点先取到：

```javascript
        // 获取视频播放器中的各个元素
        const player      = document.querySelector('.player');
        const video       = player.querySelector('.viewer');
        const progress    = player.querySelector('.progress');
        const progressBar = player.querySelector('.progress__filled');
        const toggle      = player.querySelector('.toggle');                        //播放/停止图标按钮
        const ranges      = Array.from(player.querySelectorAll('.player__slider')); //音量和播放速度按钮
        const skipButtons = Array.from(player.querySelectorAll('[data-skip]'));     //快进快退按钮
```
### 源代码功能函数的实现：
#### N0.1 点击视频播放器或者暂停/播放按钮控制视频的停-播，并且暂停/播放按钮图标随着改变
```HTML
        video.addEventListener("click",togglePlay);  //视频播放器监听点击事件，控制停-播
        toggle.addEventListener("click",togglePlay); //toggle按钮监听点击事件，控制停-播
```
```javascript
        // 使用video的两个方法使得动画暂停和运行，而判断的依据就是video.paused属性。
        function togglePlay(){
            video.paused ? video.play() : video.pause();
        }
```
接下来需要实现，toggle图标随播放状态而改变
```HTML
        video.addEventListener("play",updateButton); //根据监听video执行暂停和播放的方法来改变按钮标志
        video.addEventListener("pause",updateButton); //根据监听video执行暂停和播放的方法来改变按钮标志
```
```JS
        //改变toggle的图标
        function updateButton(){
            toggle.textContent = video.paused ? "►":"II" ;
        } 
```
#### NO.2 音量和播放速度滑动条功能的实现
```HTML
<input type="range" name="volume" class="player__slider" min=0 max="1" step="0.05" value="1" title="音量">
<input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1" title="播放速度">
```JS
const ranges  = Array.from(player.querySelectorAll('.player__slider'));

ranges[0].addEventListener("change",handle1);
ranges[1].addEventListener("change",handle2);
        // 音量改变函数
        function handle1(){
            console.log("yinliang:",this.value);
            video.volume=this.value;
        }
        //播放速度改变函数
        function handle2(){
            console.log("shudu:",this.value);

            video.playbackRate=this.value;
        }
```
> 该视频播放器有两个滑动条，前者控制音量的大小，后者控制播放速度，由于input类型相同，但是绑定的事件处理函数又不相同，可以利用name值做到一个函数来处理不同的回调函数功能（设定name值和对象的属性值一致），具体代码如下：
```JS
ranges.forEach(item=>item.addEventListener('change',rangeHandle));
// 音量和播放速度控制函数
function rangeHandle(){
    video[this.name]=this.value;  //这里动态的进行了对象的属性值设置
}
```
> 其中需要注意的是，他们分别有一个 volume 和 playbackRate 的 name 属性，我们起这两个名字是因为他们是 video 对象里对应音量和播放速度的两个属性名。这样起名并不是必须的，但可以让我们后面 js 的操作更精简。
因为我们上面说过，input 的 name 值和 video 对象中的属性名是一样的，可以看到在 handleRangeUpdate 函数中我们利用了 this.name 的写法来代表属性，，这里的 this 一样是 addEventListener 的调用者，即 range。
#### NO.3 视频快退和快进
```HTML
            <button data-skip="-5" class="player__button">« 5s</button>
            <button data-skip="5"  class="player__button">5s »</button>
```
```JS
        const skipButtons = Array.from(player.querySelectorAll('[data-skip]'));     //快进快退按钮，将伪数组转换为真正的数组
        
        skipButtons.forEach(item=>item.addEventListener("click",skip));//给快进快退按钮添加点击事件监听函数
        
        // 视频快退和快进控制函数
        function skip(){
            video.currentTime+=(+this.dataset.skip);
        }
```
> video 有一个属性叫 currentTime，可以用来设置视频当前的时间。我们只要修改这个属性就可以了  
要注意的是，这里就不能用 this 来访问 video 对象了，因为在这里面，this 指向的是遍历得到的每一个 button，而我们是要修改 video 的 currentTime 属性。 
data-** 这样的属性以前提到过了，在 JavaScript 中需要通过 .dataset.** 来访问。因为我们获取到的是字符串，所以要通过"+"来转换成数值。

#### NO.4 进度条随着视频播放而改变，进度条拖动控制视频播放功能的实现，
- 进度条随着视频播放而改变  
我们的进度条需要能在鼠标点击和拖动的时候改变视频播放的进度。我们先实现进度条随着视频播放更新进度的功能。  

进度条显示进度的原理很简单，progress__filled 这个元素是一个 flex 定位的元素，我们改变其 flex-basis 的百分比值就可以调节它所占父元素的宽度。flex-basis 值代表 flex 元素在主轴方向上的初始尺寸。progressBar.style.flexBasis对其进行设值便可以动态改变进度条的填充长度。
```html
            <div class="progress">
                <div class="progress__filled"></div>
            </div>
```
```js
        const progress    = player.querySelector('.progress');
        const progressBar = player.querySelector('.progress__filled'); 
        
        video.addEventListener("timeupdate",progressFilled); 
        
        //进度条跟随视频播放改变,那么需要实时自动来执行这个函数。
        function progressFilled(){
            progressBar.style.flexBasis=((video.currentTime/video.duration)*100).toFixed(2)+"%";

        }
```
> 现在只要运行 progressFilled 这个函数就能够更新对应的进度条，但我们需要的是自动执行这个操作。也许你会想到利用 setInterval 设置一个定时器，其实 video 元素给我们提供了更好的方法—— timeupdate 事件。这个事件会在媒体文件的 currentTime 属性改变的时触发.

- 进度条控制视频播放功能的实现（包括点击改变和拖动改变）  
实现思路：根据进度条填充部分占据整个进度条的百分比，然后结合整个video的duration，便可得出当前的video.currentTime
```JS
        progress.addEventListener("click",progressClickHandle);  //点击改变进度条位置来跟新视频播放进度
        // 拖动事件拆分为：mousedown,mousemove,mouseup
        progress.addEventListener("mousedown",()=>mousedownFlag=true);  //鼠标在进度条上按下不放将标志位置为true，然后拖动即触发mousemove事件
        progress.addEventListener("mousemove",progressMoveHandle);  //拖动改变进度条位置来跟新视频播放进度
        progress.addEventListener("mouseup",()=>mousedownFlag=false); //鼠标抬起后，标志位为false，即便触发mousemove，也不会更新视频进度

        //点击进度条来改变视频播放（手动更新视频播放进度的函数，点击和拖动都要使用这个函数）
        function progressClickHandle(e){
            video.currentTime = (e.offsetX/progress.offsetWidth)*video.duration;
        }
        // 鼠标按下拖动进度条时，更新视频播放进度，从而触发timeupdate事件来校正进度条长度。
        let mousedownFlag = false;
        function progressMoveHandle(e){
            if(mousedownFlag){
                progressClickHandle(e);
            }

        }
```
### 涉及知识点
1.title 属性规定关于元素的额外信息。  
&emsp; 这些信息通常会在鼠标移到元素上时显示一段工具提示文本（tooltip text）。  
2.:focus 伪类在元素获得焦点时向元素添加特殊的样式。  
3.flex-wrap 属性规定flex容器是单行或者多行，同时横轴的方向决定了新行堆叠的方向。  
&emsp; 注释：IE 浏览器不支持此属性。    
4.光标cursor的常见样式pointer|e-resize   
5.flex-basis属性用于设置或检索弹性盒伸缩基准值  
6.[flex属性的全面总结](https://blog.csdn.net/qq_39207948/article/details/85956861)    
7.video 对象有一个叫 paused 的属性来判断视频是否在播放  
&emsp; .play() 方法可以播放视频，.pause() 方法暂停播放  
8.textContent 属性设置或返回指定节点的文本内容，以及它的所有后代。[结合demo理解记忆](https://blog.csdn.net/qq_39207948/article/details/86099905)    
&emsp; 如果您设置了 textContent 属性，会删除所有子节点，并被替换为包含指定字符串的一个单独的文本节点。  
9.playbackRate 属性设置或返回音频/视频的当前播放速度。  
只有 Google Chrome 和 Safari 支持 playbackRate 属性。  
&emsp; 1.0 正常速度  
&emsp; 0.5 半速（更慢）  
&emsp; 2.0 倍速（更快）  
&emsp; -1.0 向后，正常速度  
&emsp; -0.5 向后，半速  
10.video.playbackRate：设置或返回音频/视频播放的速度   
&nbsp; video.volume：设置或返回音频/视频的音量  
11. 鼠标事件进行整理，具体都有哪些方法和属性。  
12. currentTime 属性设置或返回音频/视频播放的当前位置（以秒计）。  
&emsp; 当设置该属性时，播放会跳跃到指定的位置。   
13.duration	返回当前音频/视频的长度（以秒计）  
14. timeupdate事件，当目前的播放位置已更改时触发。可用来实时更新进度条部分。
