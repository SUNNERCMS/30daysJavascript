# Day11 - 自定义视频播放器

## 效果展示
![](https://github.com/SUNNERCMS/30daysJavascript/blob/master/11%20-%20%E8%87%AA%E5%AE%9A%E4%B9%89%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E5%99%A8/GIF.gif)

第十一天是要做一个自定义的视频播放器，在具有基本样式的前提下，实现视频的播放，暂停，进度条拖拽，音量加减，播放速度加减，快进快退的功能。

## 实现思路
1. 首先需要分别将变量绑定至页面上的元素
2. 分别实现播放，暂停，声音加减，播放速度加减，拖拽快进，点击快进等函数
3. 事件绑定，将页面元素绑定相应触发事件

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

## 事件监听

```javascript
<!--点击播放-->
video.addEventListener('click',videoplay);
<!--点击或者播放时改变播放和暂停状态的图标-->
// video.addEventListener('click',handleToggle);
video.addEventListener('play',handleToggle);
<!--暂停时改变图标状态-->
video.addEventListener('pause',handleToggle);
<!--时间轴更新-->
video.addEventListener('timeupdate',filledUpdate);

<!--点击播放或者暂停的图标事件的监听-->
toggle.addEventListener('click',videoplay);
toggle.addEventListener('click',handleToggle);

<!--音量和播放速度滑动条事件监听-->
let mouseflag = false;
player__slider.forEach(item => item.addEventListener('click',handlePlayerSlider));
player__slider.forEach(item => item.addEventListener('mousedown',() => mouseflag = true));
player__slider.forEach(item => item.addEventListener('mouseup',() => mouseflag = false));
player__slider.forEach(item => item.addEventListener('mousemove',(e) => mouseflag && handlePlayerSlider(e)));

<!--快进按钮事件监听-->
skip.forEach(item => item.addEventListener('click',handleSkip));


<!--播放事件轴拖拽监听-->
let filledflag = false;
progressBar.addEventListener('click',handlefilled);
progressBar.addEventListener('mousemove',(e) => filledflag && handlefilled(e));
progressBar.addEventListener('mousedown',() => filledflag = true);
progressBar.addEventListener('mouseup',() => filledflag = false);
```

分别给页面元素建立事件监听，并绑定其实现函数即可。此处有两处需注意:

1. 有实现进度条的点击拖拽，不能仅绑定`mousemove`事件，因为这样鼠标在上面滑过就会出发事件，还需判断鼠标是否点下，此处可设立一个布尔类型的`flag`标志鼠标是否按下，并分别绑定`mouseup`事件和`mousedown`事件，设置此`flag`的值，这样在`mousemove`事件的回调函数中先判断此`flag`的值，若为真是才继续触发事件。
2. `mousemove`的回调函数本应如下:

```javascript
{
    if(filledflag){
        handlefilled(e);
    }
｝
```
但这样不够简洁，我们改进此代码如下：

```
filledflag && handlefilled(e)
```
使用`&&`判断左右两变量，只有两个都为真的时候整体表达式才为真，且在判断时从左向右依次判断，若左变量就为假，就不会再去执行右边的表达式。

## 函数实现

* 视频播放与暂停转换函数

```Javascript
function videoplay(e){
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}
```
判断当前视频的播放状态，播放时则变为暂停状态、暂停则变为播放状态；分别调用`video.play()`和`video.pause()`方法，在此使用`video[play]()`和`video[pause]()`是因为，使用中括号能够动态的传递变量进去，而使用点运算符不能传参。

* 播放按钮状态显示函数


```Javascript
function handleToggle(){
    let icon = video.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}
```
如果视频是暂停状态就显示播放键'►'，否则显示暂定键'❚❚'

* 音量大小和播放速度控制函数

```Javascript
function handlePlayerSlider(e){
    video[e.target.name] = e.target.value;
}
```
在页面HTML中是这样设置的：


```HTML
<input type="range" name="volume" class="player__slider" min="0" max="1" step="0.05" value="1">
<input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1">
```
分别给每一个范围设置了一个`name`属性，代表该范围所表示的内容，同时也是需控制的方法名，因此我们通过设置`video[e.target.name] = e.target.value;`就可以分别改变视频的音量和播放速度，此处`e.target`就是这两个`input`元素，也等同于`this`。

* 快进快退函数

```Javascript
function handleSkip(e){
    let skiptime = parseFloat(this.dataset.skip);
    video.currentTime += skiptime;
}
```
页面中快进快退的HTML代码如下:


```HTML
<button data-skip="-10" class="player__button">« 10s</button>
<button data-skip="25" class="player__button">25s »</button>
```
分别设置了`data-skip`属性，这样就可以通过`.dataset.skip`获取到该属性的值，也即`this.dataset.skip`，但该值是字符串类型，需要用`parseFloat()`讲其转换为float数值型，分别将时间加减当前视频的播放事件就可以做到快进快退。

* 进度条随播放时间而显示的函数

```Javascript
function filledUpdate(){
    let portion = parseFloat(video.currentTime / video.duration) * 100;
    filled.style.flexBasis = `${portion}%`;
}
```
通过视频当前的播放时间除以视频的总时长*100，就是当前视频播放的百分比，将该值使用模版字符串的方式传给`flexBasis`样式中即可，在CSS中该样式名为`flex-basis`,但是谨记在js中需要多单词的CSS属性需要变为驼峰式的命名，第二个单词大写，切不可用连字符连接。

* 拖拽进度条定点观看的函数


```Javascript
function handlefilled(e){    
    let pice = (e.offsetX / progressBar.offsetWidth) * video.duration;
    video.currentTime = pice;
}
```

我们需要点击进度条时调整播放进度，那么我们改变进度，或者说宽度就需要得到鼠标点击的位置，这可以通过事件对象的 `offsetX` 属性来找到，该属性代表鼠标点击位置相对于该元素的水平偏移。得到偏移之后计算出该位置的百分比，那么也就知道了进度的百分比。

播放/暂停
功能实现
视频最主要的功能自然就是播放和暂停了，而且其他功能也需要视频播放之后才能看出效果，所以我们先来实现这个功能。 video 对象有一个叫 paused 的属性来判断视频是否在播放；另外还提供了两个方法来进行播放和暂停的操作：.play() 方法可以播放视频，.pause() 方法暂停播放

那么只需要在点击的视频的时候进行这两个操作就可以了，我们可以写一个 togglePlay 方法，根据视频的播放状态来判断该执行哪个：

function togglePlay() {
    if (video.paused) {
        video.play();
    } else (
        video.pause();
    )
}

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
对于这种二选一的判断用三元操作符会更简洁，我们可以直接在一行里写完，像这样：

function tooglePlay() {
    video.paused ? video.play() : video.pause()
}
或者我们可以用字符串来执行属性方法：

function tooglePlay() {
    const method = vidoe.paused ? 'play' : 'pause';
    video[method]();

}
这种方法可能会觉得看起来别扭，但在有些情况下是挺有用的。现在我们点击视频的话已经能够正常切换播放和暂停的状态了。

图标切换
为了让用户知晓播放器状态，我们需要直观地通过图标来展示。当然，我们可以在 togglePlay() 方法中处理，不过更好的方式是给播放器加上另一个事件监听，用视频本身的播放状态来判断。

这是因为，除了点击播放/暂停按钮以外，我们还可以通过比如键盘快捷键、第三方插件甚至耳机上的操作按钮等其他方式来控制。因此，通过视频本身的播放状态来判断是最不容易出错的。代码如下：

// 逻辑
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}
// 事件
video.addEventListener('play', updateButton)；
video.addEventListener('pause', updateButton)；
上面的代码中，我们使用了关键字 this。其实在调用 updateButton 的时候，这个方法已经被绑定在了 addEventListener 的调用者上，也就是绑定到了 video 上。因此，this.paused 在这里就相当于 video.paused。

快退/快进
在 HTML 中，我们已经给快退/快进键添加了一个 data-skip 属性，对应的值即为快退/快进的秒数。

我们先来写事件处理。首先要有一个回调函数，叫 skip。事件监听的对象，当然是 skipButtons，对应的就是快退/快进两个按键。可以尝试一下，如果我们直接在命令行输出这个 skipButtons，会得到一个数组。因此，我们需要用 forEach 来遍历一下，给每一个按钮都添加上事件监听：

// 逻辑
function skip() {

}
// 事件
skipButtons.forEach(button => button.addEventListener('click', skip));
然后我们来处理逻辑部分。video 有一个属性叫 currentTime，可以用来设置视频当前的时间。我们只要修改这个属性就可以了：

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}
要注意的是，这里就不能用 this 来访问 video 对象了，因为在这里面，this 指向的是遍历得到的每一个 button，而我们是要修改 video 的 currentTime 属性。

data-** 这样的属性以前提到过了，在 JavaScript 中需要通过 .dataset.** 来访问。因为我们获取到的是字符串，所以要通过 parseFloat 来转换一下。

音量和播放速度
接下来我们实现通过控制面板上两个滑动条来控制视频的音量和播放速度。这两个滑动条是 range 类型的 input 元素，在元素属性中我们指定了他们各自的最大、最小值和调节的“步值”。

其中需要注意的是，他们分别有一个 volume 和 playbackRate 的 name 属性，我们起这两个名字是因为他们是 video 对象里对应音量和播放速度的两个属性名。这样起名并不是必须的，但可以让我们后面 js 的操作更精简。

通过监听两个 input 元素的 change 事件，我们就可以通过其 value 值改变视频属性了：

function handleRangeUpdate() {
    video[this.name] = this.value;
}

//遍历 ranges 给两个滑动条都绑定事件
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
因为我们上面说过，input 的 name 值和 video 对象中的属性名是一样的，可以看到在 handleRangeUpdate 函数中我们利用了 this.name 的写法来代表属性，，这里的 this 一样是 addEventListener 的调用者，即 range。

现在调节两个滑动条我们已经可以改变视频相应属性了，美中不足就是滑块的调节并不是实时的，而要等我们放开鼠标才会生效，这是因为 change 事件只在 blur，也就是元素失去焦点的时候才会触发。要解决这个问题我们可以把 change 事件改为 input 事件；另一种比较传统的方法是同时监听鼠标在该元素上的 mousemove 事件来执行更新的操作， 在原来的代码下加上一行：

ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
这样鼠标在这滑动条上移动的时候也会更新视频属性了，只不过只有在鼠标拖动滑块的时候才会有值的改变。

进度条操作
我们的进度条需要能在鼠标点击和拖动的时候改变视频播放的进度。我们先实现进度条随着视频播放更新进度的功能。

进度条显示进度的原理很简单，progress__filled 这个元素是一个 flex 定位的元素，我们改变其 flex-basis 的百分比值就可以调节它所占父元素的宽度。flex-basis 值代表 flex 元素在主轴方向上的初始尺寸。关于 flex-basis 的更多信息请参考 MDN

// 根据当前播放时间来调节进度条
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}
现在只要运行 handleProgress 这个函数就能够更新对应的进度条，但我们需要的是自动执行这个操作。也许你会想到利用 setInterval 设置一个定时器，其实 video 元素给我们提供了更好的方法—— timeupdate 事件。这个事件会在媒体文件的 currentTime 属性改变的时触发，更多信息请参考 MDN

事件操作如下：

video.addEventListener('timeupdate', handleProgress);
现在随着视频的播放，进度条也会更新进度了。

接着我们需要点击进度条时调整播放进度，那么我们改变进度，或者说宽度就需要得到鼠标点击的位置，这可以通过事件对象的 offsetX 属性来找到，该属性代表鼠标点击位置相对于该元素的水平偏移。得到偏移之后计算出该位置的百分比，那么也就知道了进度的百分比：

...
// 根据点击位置设置播放时间
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * vidoe.duration;
    video.currentTime = scrubTime;
}

// 点击事件监听
progress.addEventListener('click', scrub);
进度条还要求可以拖动，这个操作我们可以通过设置一个标志来判断当前是否出于拖动状态，然后配合 mousedown、mouseup 事件来更新这个标志：

...
let mousedown = false;

// 鼠标在 progress 上移动时更新进度
progress.addEventListener('mousemove', (e) => {

    // 若处于拖拽状态则执行更新
    if (mousedown) {
        scrub(e);
    }
});

// 鼠标按下改变标志
progress.addEventListener('mousedown', () => mousedown = true);

// 鼠标抬起恢复标志
progress.addEventListener('mouseup', () => mousedown = false);
这样就实现了拖拽进度条时改变播放进度的功能，实际使用的时候会发现拖拽和视频的更新并不是实时的，会有一定延迟，这是因为 mousemove 事件触发的频率非常高，视频更新的速度跟不上。

对于 mousemove 的回调函数其实我们可以写得更简洁：

progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
我们利用逻辑和操作符 && 的短路特性来实现 “只有当 mousedown 为 true，或可类型转换为 true 时才执行 scrub(e)” 的判断操作，由于逻辑和的判断必须两个都为真时才成立，所以若第一项不为真，那么 js 就不会去管第二项是什么，因此也就不会执行 scrub(e)。这种写法在实际项目中是挺常见的，算是一个小技巧，希望大家可以熟悉并使用。
### 涉及知识点
1.title 属性规定关于元素的额外信息。  
这些信息通常会在鼠标移到元素上时显示一段工具提示文本（tooltip text）。  
2.:focus 伪类在元素获得焦点时向元素添加特殊的样式。
3.flex-wrap 属性规定flex容器是单行或者多行，同时横轴的方向决定了新行堆叠的方向。。
注释：IE 浏览器不支持此属性。    
4.光标cursor的常见样式pointer|e-resize   
5.flex-basis属性用于设置或检索弹性盒伸缩基准值  
6.flex的总结  
7.video 对象有一个叫 paused 的属性来判断视频是否在播放  
.play() 方法可以播放视频，.pause() 方法暂停播放  
8.textContent 属性设置或返回指定节点的文本内容，以及它的所有后代。  
如果您设置了 textContent 属性，会删除所有子节点，并被替换为包含指定字符串的一个单独的文本节点。  
9.playbackRate 属性设置或返回音频/视频的当前播放速度。  
只有 Google Chrome 和 Safari 支持 playbackRate 属性。  
1.0 正常速度  
0.5 半速（更慢）  
2.0 倍速（更快）  
-1.0 向后，正常速度  
-0.5 向后，半速  
10.video.playbackRate：设置或返回音频/视频播放的速度   
video.volume：设置或返回音频/视频的音量  
11. 鼠标事件进行整理，具体都有哪些方法和属性。  
12. currentTime 属性设置或返回音频/视频播放的当前位置（以秒计）。  
当设置该属性时，播放会跳跃到指定的位置。   
13.duration	返回当前音频/视频的长度（以秒计）  
14. timeupdate事件，当目前的播放位置已更改时触发。可用来实时更新进度条部分。
