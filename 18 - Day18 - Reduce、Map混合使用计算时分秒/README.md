## Day18 - Reduce、Map混合使用计算时分秒
### 效果图

![](https://github.com/SUNNERCMS/30daysJavascript/blob/master/18%20-%20Day18%20-%20Reduce%E3%80%81Map%E6%B7%B7%E5%90%88%E4%BD%BF%E7%94%A8%E8%AE%A1%E7%AE%97%E6%97%B6%E5%88%86%E7%A7%92/show.PNG)

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
      //将每项的时间长度也显示出来
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
> 主要内容就是两部分:  
1、获得各项的data-time值，然后进行累加
2、根据总秒数进行时分秒的计算  

  `let [mins,seconds] = datatime.split(":").map(item=>parseFloat(item));`  
 解构赋值:这里是将时和秒数进行切割形成新的数组，然后对数组中的每一项用parseFloat()进行字符串转换为数值，然后进行解构赋值，例如：[mins,seconds]=[03,58];这里将03赋值给mins,将58赋值给seconds.  
  
  `input.value=Math.floor(sum/3600)+"个小时"+Math.floor((sum%3600)/60)+"分"+sum%60+"秒";`  
  
总秒数除以3600得到的商就是小时个数，然后进行向下取整；  
总秒数对3600取余，实际得到的是出去小时后还剩下多少秒，然后对剩下的秒数除以60（一分钟60秒）得到有多少分钟；  
总秒数对60取余：即是说总秒数中把能凑成60的，也就是说能组成分钟的除去后还剩多少秒，就是要求的秒数。
