# Day06 - Fetch、filter、正则表达式实现快速古诗匹配
## 效果图

在输入框中搜索`字或者某个词`快速匹配含有这个字或者是词的诗句。
![](https://github.com/SUNNERCMS/30daysJavascript/blob/master/06%20-%20Fetch%E3%80%81filter%E3%80%81%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%AE%9E%E7%8E%B0%E5%BF%AB%E9%80%9F%E5%8F%A4%E8%AF%97%E5%8C%B9%E9%85%8D/DemoGIF.gif)

## 涉及特性

- flex布局  

- `nth-child`奇偶匹配  

- Fetch获取数据以及异常处理  

- Array
	- `filter()`  
	- `push()`  
	- `...`  
- JavaScript RegExp 对象

    - 字面量语法
    - 创建 RegExp 对象的语法
    - 修饰符`i`、`g`
    - `test()`
    - `replace()`
- 防抖处理
- 匹配文本的高亮显示
- "瓦楞纸效果"的实现：transform:perspective(xxxpx) rotateX(xdeg)
## 实现步骤
- UI布局
- 通过Fetch下载数据
- 数据处理并保存
- 事件监听
- 数据匹配操作
- 新数据替换展示

## 布局篇

- HTML代码

```html
 <form class="search-form">
        <input type="text" class="search" placeholder="诗人名字，关键字">
        <ul class="suggestions">
            <li>输入诗人名字</li>
            <li>输入关键字，找一首诗</li>
        </ul>
    </form>
```

- CSS代码

```css
    <style>
        html{
            box-sizing:border-box;
            margin:0px;
            background-color:burlywood;
            font-family: "Kaiti","SimHei","Hiragino Sans GB","Helvetica neue";
            font-size:625%;
            font-weight:200;
        }
        *,*:before,*:after{
            box-sizing:inherit;
        }
        body{
            display: flex;
            justify-content: center;
            /*text-align:center;*/
        }
        .search-form{
            display: flex;
            flex-direction:column; /*规定元素项目垂直显示，此时主轴为垂直方向*/
            align-items: center;  /*在主轴垂直时，设置align-items可以使元素水平居中*/
        }
        .search{
            width:8rem;
            border:0.1rem solid #f7f7f7;
            padding:0.2rem;
            border-radius: 0.05rem;
            font-size:0.2rem;
            text-align:center;
            box-shadow:0 0 5px 0 rgba(0,0,0,0.12),
                       0 0 3px 0 rgba(0,0,0,.19) inset;
            margin-top:0.4rem;
            outline:none;  /*去掉input框的默认样式*/
        }
        .suggestions{
            list-style: none; /*去掉序列修饰符号*/
            width:6rem;
            margin:0px;
            padding: 0px;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size:0.2rem;
        }
        .suggestions li{
            text-align: center;
            width:100%;
            background: white;
            border-bottom: 0.01rem solid #D8D8D8;
            padding:0.15rem;
            box-shadow:0 0 10px rgba(0,0,0,0.14);
            /*transition:transform 0.5s ease;*/
        }
        .suggestions li:hover{
            box-shadow: 0 0 10px 0 rgba(0,0,0,0.4);
        }
        .suggestions p{
            text-align:right;
            margin:0;
        }
        /*实现奇偶栏的折叠效果*/
        .suggestions li:nth-child(odd){
            transform: perspective(1rem) rotateX(-3deg) ;
        }
        .suggestions li:nth-child(even){
            transform: perspective(1rem) rotateX(3deg) translateY(-2px) ;
        }
    </style>
```

- CSS布局相关参考文档

    - [CSS参考手册](http://www.css88.com/book/css/properties/flex/flex.htm)
    
    - [CSS选择器笔记](http://www.ruanyifeng.com/blog/2009/03/css_selectors.html)
    
    - [flex布局完全入门教程](http://bbs.kongyixueyuan.com/topic/10/flex布局完全入门教程)
    
    - [使用HTML5里的classList操作CSS类](http://www.webhek.com/post/html5-classlist-api.html)
    
    - [position](http://zh.learnlayout.com/position.html)

## 通过Fetch下载数据解析并且保存

```js
 //通过fetch来获取后台数据，并进行json化以及请求异常处理。
        fetch(url)
            .then(response=>{
                if(response.ok){   
                    return response.json();  
                }else{
                    return Promise.reject({
                        status:response.status,
                        statusText:response.statusText
                    });
                }
                
            })
            .then(data => { poetrys.push(...data);  //concat会创建一个新数组，push会修改原来的数组，所以可以直接拿过来用。
                            // console.log(poetrys);
                })
            .catch(e=>{console.log("status:",e.status);
                       console.log("statusText:",e.statusText);
                });

```

[Fetch详细使用文档，详见本人博客](https://blog.csdn.net/qq_39207948/article/details/85050687)  

## 事件监听

```js
 	const search = document.querySelector(".search");
        const suggestions = document.querySelector(".suggestions");
        search.addEventListener("change",debounce(findMatches,500)); //当输入框中文本改变时会触发事件处理函数
        search.addEventListener("keyup",debounce(findMatches,500));  //当按键up时会触发事件，最好有防抖操作。
```

获取`search`和`suggestions'`节点分别对`change`、`keyup`事件进行监听，当输入框中的内容发生变化或者键盘弹起时触发`debounce`函数进行防抖处理。

## 数据匹配操作

- RegExp使用基础

[RegExp参考文档](http://www.w3school.com.cn/jsref/jsref_obj_regexp.asp)

- 项目源码分析

```js
        //关键字匹配函数，在里面又调用了内容加载函数
        function findMatches(){
            //有搜索内容时，进行关键字匹配，没有的话显示两行提示
            if(this.value){
                let regexp = new RegExp(this.value,"gi");
                let matched= poetrys.filter(item=>{   //根据标题、作者名、文本中的是否有关键字，将该数组项取出
                    return regexp.test(item.title)||regexp.test(item.detail_author)||regexp.test(item.detail_text);
                    });
                if(matched.length > 0){    //如果匹配到数组项，将匹配到的内容加载出来
                    createDom(matched);
                }else{                     //如果没有匹配项，那么显示提示信息。
                    suggestions.innerHTML='';
                    suggestions.innerHTML=`<li>抱歉，没有查找到匹配项！</li>`
                }
            }else{
                suggestions.innerHTML=`<li>输入诗人名字</li>
                                        <li>输入关键字，找一首诗</li>`;
            }
        }
        //将匹配到的内容加载出来
        function createDom(matched){
            let frag = document.createDocumentFragment();  //用文本片段的形式进行一次性添加，减少回流重绘。
            matched.forEach(item=>{
                    let li = document.createElement("li");
                    let p= document.createElement("p");
                    let regexp = new RegExp(search.value,"gi");
                    //将匹配到的关键词用带样式的形式进行替换。
                    let detailText   = item.detail_text.replace(regexp,`<span style="color:green">${search.value}</span>`);
                    let title        = item.title.replace(regexp,`<span style="color:green">${search.value}</span>`);
                    let detailAuthor = item.detail_author[0].replace(regexp,`<span style="color:green">${search.value}</span>`);
                    li.innerHTML = detailText;
                    p.innerHTML = title + "-" +detailAuthor;
                    // p.setAttribute("style","text-align:right;margin:0px");
                    li.appendChild(p);
                    frag.appendChild(li);
                });
            suggestions.innerHTML='';
            suggestions.appendChild(frag);
         }
```
