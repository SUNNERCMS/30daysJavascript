## Day18 - Reduce、Map混合使用计算时分秒
### 效果图
![](http://om1c35wrq.bkt.clouddn.com/day18%E6%95%88%E6%9E%9C%E5%9B%BE.png)
第18天挑战的内容主要是如何将一系列的`data-time`加起来，最终计算总时间，总时间用时分秒显示。  
挑战升级：点击显示时长按钮将每个video的时间显示出来，将选中的videos进行总时长的计算。

### 代码解析
css页面布局和示例17：无冠词排序基本一致
主要分析JavaScript代码：
```JS
  <script>
      let list=[...document.querySelectorAll("li")];
      let input = document.querySelector("input");
      let button = document.querySelector("button");
      button.addEventListener("click",totalTime);
      list.forEach(item=>{
        let datatime=item.dataset.time;
        item.innerHTML=item.innerHTML+"------------时长："+datatime;
      });
      //总时间计算函数
      function totalTime(){
        let sum = list.reduce((cal,item)=>{
                let datatime=item.getAttribute("data-time");
                let [mins,seconds] = datatime.split(":").map(item=>parseFloat(item));//解构赋值
                return cal+(mins*60+seconds); //reduce求和注意要让cal带入计算
              },0);
        let hours=sum/3600;
        input.value=Math.floor(sum/3600)+"个小时"+Math.floor((sum%3600)/60)+"分"+sum%60+"秒";
      }
  </script>
```
