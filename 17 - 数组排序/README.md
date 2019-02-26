## Day17 - Sort Without Articles(无冠词排序）
### 效果图

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

排序函数：
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
>  这里的思路：刚开始使用的是两个函数，点击不同的按钮跳转到各自的事件处理函数上去。但是写完发现这两个函数及其相似，过于冗余，使用了name属性，然后当点击不同的按钮时，获取各自的name值，然后根据name值来判断点击的是哪一个按钮，来处理升序还是降序。   

这里涉及的知识点：    
- 1.使用`get.Attribute()`来获取属性值，但是具体获取那个元素的，这里使用了事件项event,这里的this就是e.target：表示当前元素。  
- 2.sort数组的排序函数，根据判断程序来判断条件的正负，正的升序，负的降序，会改变原来的数组，所以，在最后有个显示的语句show(bands,bandsele);    

删去冠词的函数：  
```JS
   // 取出冠词a,an,the的函数，返回一个新的字符串
    function del(item){
        return item.replace(/^(a|an|the)\s{1}/ig,''); 
    }
```
> \s{1}表示有一个空格,replace返回的事一个新字符串。  

列表项显示函数：
```JS
    //将数组中的元素进行显示在指定列表中的函数,遍历整个数组元素，然后将返回的元素进行拼接整体显示在innerHTML
    function show(arr,place){
        place.innerHTML=arr.map(item=>{return `<li>${item}</li>`}).join('');
    }
```
> 这个函数相当实用，map函数返回一个新的数组。
