# Day10 - JS 实现 Checkbox 中按住 Shift 的多选功能

## 项目效果

![](https://github.com/SUNNERCMS/30daysJavascript/blob/master/10%20-%20JS%20%E5%AE%9E%E7%8E%B0%20Checkbox%20%E4%B8%AD%E6%8C%89%E4%BD%8F%20Shift%20%E7%9A%84%E5%A4%9A%E9%80%89%E5%8A%9F%E8%83%BD/GIF.gif)

初始文档中提供了一组 checkbox 类型的 input 元素，选中某个复选框时，其 <p> 标签中的文字会显示删除线。最终效果是，提供按下 Shift 键后进行多选操作的功能。readme.md文档中的说明对应的是xunzhoaxinag.html。
## 操作方法

1. 选中 A 项
2. 按下 Shift
3. 再选中 B 项
4. A-B 之间的所有项都被选中或者取消

## 实现方法

### 方法一

Wes Bos 在文档里提供了一种解决办法：用一个变量，来标记这个范围。

变量初始值为 `false`，当按下 Shift 键且同时选中了某个元素的时候，遍历所有项，遍历过程中，若遇到 A 或 B，则将标记值取反。同时，将所有标记为 `true` 的项设置为选中。

```js
let startChecked;

//	处理方法一：用变量 inBetween 对需要选中的元素进行标记
function handleCheck0(e) {
	let inBetween = false;
	if(e.shiftKey && this.checked){
		boxs.forEach(input => {
			console.log(input);
			if(input === startChecked || input ===this) {
				inBetween = !inBetween;
			}
			if(inBetween) {
				console.log("on");
				input.checked = true;
			}
	});
	}
	startChecked = this;
}
```
> 上面会出现一个问题，初次加载页面时，按住 Shift 再点击某一项，此项之后的元素都会被选中。此外，对于取消选中，无法批量操作。所以我参照了 Stack Overflow 的一个答案： How can I shift-select multiple checkboxes like GMail? 改进得到第二种解决方案。

### 方法二
方法一中的 inBetween 仅仅表示此项是否在被选中的范围中，此处会赋给它更多的意义，用它来表示此项是选中还是未选中，而范围划定则由数组来解决。  

首先将获取到的 `<input>` 组转化为数组，针对每次操作，获取 A 和 B，利用 `indexOf()` 来获得 A 和 B 在数组中的索引值，由此即可确定范围，并能通过 `slice()` 来直接截取 A-B 的所有 DOM 元素，并进行状态改变的操作，而变量 onOff 表示 A-B 范围内的状态，true 表示选中，false 表示取消选中。
```js
    const boxs = document.querySelectorAll('.inbox input[type="checkbox"]');
    const boxArr = Array.from(boxs);
    boxArr.forEach(box => box.addEventListener('click', handleCheck1));

//  处理方法二：利用数组索引获取需要选中的范围

    let lastinput;//用来保存上一次的点击元素
    let onoff; //用来保存上一次的点击状态，已提供给截取范围内CheckBox的状态

    function handleCheck1(e){
        if(e.shiftKey){                   //若果按下shift按键再点击时进入该程序，主要用来处理索引值
            let cur=boxArr.indexOf(this);    //用来获取当前点击元素是第几个input
            let last=boxArr.indexOf(lastinput);  //用来获取上一次点击元素是第几个input
            boxArr.slice(Math.min(cur,last),Math.max(cur,last)+1) //slice返回一个子数组
                .forEach(item=>item.checked = onoff); //将截取出来的各项状态设置的和上下点击元素的状态一致
        }

        lastinput = this;  //用来存放第一次或者上一次的点击元素（将当前点击元素作为上次元素，然后在有点击时和下次又组成一个范围）
        onoff = lastinput.checked ? true : false;  //识别第一次或者上一次点击元素的状态值
    }
}
```
> 学习用全局变量来存放（由当前状态，转换而成的）上次状态。  
设置两个变量(全局变量)来分别保存上一次的点击元素和其状态，接下里选中范围的元素状态以此为依据。  
在shift被按下时，需要得到上次点击元素的索引，和当前点击元素（this）的索引，  
然后将该段内input元素的状态全部统一于上次点击后的状态。  
然后将当前点击元素作为上次元素，进行一个接龙。  
### 涉及知识点
- 1.shiftKey：检测 SHIFT 键是否被按住。  
事件属性可返回一个布尔值，指示当事件发生时，“SHIFT”键是否被按下并保持住。  
语法：event.shiftKey=true|false|1|0，这里的event用this无效，用e.target无效。  
- 2.document.querySelectorAll('.inbox input[type="checkbox"]')  
通过[]和属性名称来选取指定元素  

