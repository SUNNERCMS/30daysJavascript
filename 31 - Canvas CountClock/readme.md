### 效果展示
![](https://github.com/SUNNERCMS/30daysJavascript/blob/master/31%20-%20Canvas%20CountClock/image/GIF.gif)
### 代码部分
```javascript
    //将上下文环境进行渲染
    function render(cxt){
	let now = new Date();
	let hours   = now.getHours();
	let minutes = now.getMinutes();
	let seconds = now.getSeconds();

	renderdigit(MARGIN_LEFT,MARIGN_TOP,parseInt(hours/10),cxt);  //时钟的十位数
	renderdigit(MARGIN_LEFT+15*(RADIUS+1),MARIGN_TOP,parseInt(hours%10),cxt);//时钟的个位数
	renderdigit(MARGIN_LEFT+30*(RADIUS+1),MARIGN_TOP,10,cxt);//冒号":"的粒子化
	renderdigit(MARGIN_LEFT+39*(RADIUS+1),MARIGN_TOP,parseInt(minutes/10),cxt);//分钟十位数粒子化
	renderdigit(MARGIN_LEFT+54*(RADIUS+1),MARIGN_TOP,parseInt(minutes%10),cxt);//分钟个位数粒子化
	renderdigit(MARGIN_LEFT+69*(RADIUS+1),MARIGN_TOP,10,cxt);
	//冒号粒子化
	renderdigit(MARGIN_LEFT+78*(RADIUS+1),MARIGN_TOP,parseInt(seconds/10),cxt);
	//秒针十位数粒子化
	renderdigit(MARGIN_LEFT+93*(RADIUS+1),MARIGN_TOP,parseInt(seconds%10),cxt);
	//秒针个位数粒子化
    }
```
> 由下面的数字点阵图可以知道，每一个点阵屏都是十行7列，也就是说每一个数字显示所占据的宽度是7*2*(RADIUS+1)=14*(RADIUS+1),为了让数字之间留有间隙，不让数字紧紧挨着，所以每一块点阵屏（显示一个数字）的宽度设置为15*(RADIUS+1)，冒号的宽度是4*2*(RADIUS+1)=8*(RADIUS+1)，同样为了布局美观采用9*(RADIUS+1)。

```JavaScript
//将每一位数字进行粒子化
    renderdigit(x,y,num,cxt){
	cxt.fillStyle="rgb(0,102,153)";
	for(let i=0;i<digit[num].length;i++){
	    //将每一位数字进行粒子化
	    function renderdigit(x,y,num,cxt){
		cxt.fillStyle="rgb(0,102,153)";
		for(let i=0;i<digit[num].length;i++){
		    for(let j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]===1){
			    cxt.beginPath();
			    cxt.arc(x+(RADIUS+1)+j*2*(RADIUS+1),y+(RADIUS+1)+i*2*(RADIUS+1),RADIUS,0,2*Math.PI);
			    cxt.closePath();

	}
			    cxt.fill();
			}
		    }
		}
	    }
```
> 代码分析：renderdigit(x,y,num,cxt)：参数x,y表示当前这位数字的位置， num是要进行粒子化的数字，cxt是画布上下文。  
这里的digit[num]是点阵中具体哪一块，刚好点阵我们设置规则是：点阵的0项块对应数字“0”以此类推，可以用要渲染哪一个数字来到点阵中取得相应的那一项。  
	
- 数字点阵的图示  
![](https://github.com/SUNNERCMS/30daysJavascript/blob/master/31%20-%20Canvas%20CountClock/image/digit.PNG)  
	
> `cxt.arc(x+(RADIUS+1)+j*2*(RADIUS+1),y+(RADIUS+1)+i*2*(RADIUS+1),RADIUS,0,2*Math.PI); `参数里面是每一个小圆点的圆心的坐标位置，从坐标x,y开始，每一个小方格的距离是2*(RADIUS+1)。
