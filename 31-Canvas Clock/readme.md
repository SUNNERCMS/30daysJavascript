### 效果展示

```JavaScript
            //将每一位数字进行粒子化
            function renderdigit(x,y,num,cxt){
                cxt.fillStyle="rgb(0,102,153)";
                for(let i=0;i<digit[num].length;i++){
                    for(let j=0;j<digit[num][i].length;j++){
                        if(digit[num][i][j]===1){
                            cxt.beginPath();
                            cxt.arc(x+(RADIUS+1)+j*2*(RADIUS+1),y+(RADIUS+1)+i*2*(RADIUS+1),RADIUS,0,2*Math.PI);
                            cxt.closePath();

                            cxt.fill();
                        }
                    }
                }
            }
```
> 代码分析：renderdigit(x,y,num,cxt)：参数x,y表示当前这位数字的位置， num是要进行粒子化的数字，cxt是画布上下文。  
这里的digit[num]是点阵中具体哪一块，刚好点阵我们设置规则是：点阵的0项块对应数字“0”以此类推，可以用要渲染哪一个数字来到点阵中取得相应的那一项。  
- 数字点阵的图示  
![](https://github.com/SUNNERCMS/30daysJavascript/blob/master/31-Canvas%20Clock/image/digit.PNG)
>   `cxt.arc(x+(RADIUS+1)+j*2*(RADIUS+1),y+(RADIUS+1)+i*2*(RADIUS+1),RADIUS,0,2*Math.PI); `参数里面是每一个小圆点的圆心的坐标位置，从坐标x,y开始，每一个小方格的距离是2*(RADIUS+1)。
