### Day17 - Sort Without Articles(无冠词排序）
#### 效果图

![](https://github.com/SUNNERCMS/30daysJavascript/blob/master/17%20-%20%E6%95%B0%E7%BB%84%E6%8E%92%E5%BA%8F/show.PNG)
##### 实现效果：对列表中列表项内容进行无冠词排序，在排序时不考虑a,an,the（大小写）的影响，点击ascending按钮进行升序，按下descending进行降序。
### 源码分析
```CSS
body{
    background: url("https://source.unsplash.com/nDqA4d5NL0k/2000x2000");
    background-size:cover;
    padding:50px;
    display:flex;
    flex-direction: column; /*这里是将ul,和div进行垂直居中排列，二者相对位置是上下，不加的话相对位置水平*/
    align-items:center;
    min-height:100vh;
}
```
```HTML
    <ul id="bands"></ul>
    <div class="button">
        <button name="ascending">升序</button>
        <button name="descengding">降序</button>
    </div>
```
> 这里给两个按钮进行命名，用以区分两个按钮，在进行CSS布局时使用`flex-direction：column`将ul和div处于竖直布局。
```JS
const button=[...document.querySelectorAll("button")];//使用扩展运算符，这里是打散，将伪数组转化为真正的数组
button.forEach(item=>item.addEventListener("click",paixu));
```
> 这里取得所有的按钮元素，并给每个按钮添加一个鼠标点击事件，注意项：伪元素转换为真正元素，可以使用扩展运算符，也可以使用`Array.form()`.

```JS        
//用sort比较函数以及del函数将每一项去除完冠词后进行比较，然后根据比较条件的正负，对原来项进行排序,sort会改变原数组
function paixu(e){
    let flag=this.getAttribute("name");//使用name值对相同元素进行区别
    if(flag=="ascending"){
        bands.sort((a,b)=>del(a)>del(b)?1:-1);
    }else{
        bands.sort((a,b)=>del(a)>del(b)?-1:1);
    }
    show(bands,bandsele);
}
```
>  

```JS
```
```JS
```
