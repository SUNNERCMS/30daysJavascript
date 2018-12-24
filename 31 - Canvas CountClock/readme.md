### 效果展示

```JavaScript
//将每一位数字进行粒子化
    renderdigit(x,y,num,cxt){
        cxt.fillStyle="rgb(0,102,153)";
        for(let i=0;i<digit[num].length;i++){

        }
```
> 代码分析：renderdigit(x,y,num,cxt)：参数x,y表示当前这位数字的位置， num是要进行粒子化的数字，cxt是画布上下文。  
这里的digit[num]是点阵中具体哪一块，刚好点阵我们设置规则是：点阵的0项块对应数字“0”以此类推，可以用要渲染哪一个数字来到点阵中取得相应的那一项。
