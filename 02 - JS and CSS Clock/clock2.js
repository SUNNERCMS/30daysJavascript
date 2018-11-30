/*
* @Author: Administrator
* @Date:   2018-11-30 10:48:55
* @Last Modified by:   Administrator
* @Last Modified time: 2018-11-30 11:34:08
*/
/*
* @Author: Administrator
* @Date:   2018-11-27 20:15:18
* @Last Modified by:   Administrator
* @Last Modified time: 2018-11-29 13:53:54
*/
//每隔一秒，计算一次时分秒的角度进行定位。

function left(){
    const secondHand = document.querySelector(".second-hand");
    const minHand    = document.querySelector(".min-hand");
    const hourHand   = document.querySelector(".hour-hand");
    function updata(){
        const now = new Date();
        //秒针的旋转计算，以及闪动消除 
        const seconds               =  now.getSeconds();
        const secondsDegrees        =  seconds*6;
        if (secondsDegrees === 0) {
            secondHand.style.transition = 'all 0s';
        } else {
            secondHand.style.transition = 'all 0.05s';
        }
        secondHand.style.transform  =  `rotate(${secondsDegrees}deg)`;
        //分针旋转的计算
        const mins                =  now.getMinutes();
        const minsDegrees         =  (mins*6)+(seconds/60)*6;
        if (minsDegrees === 0) {
            minHand.style.transition = 'all 0s';
        } else {
            minHand.style.transition = 'all 0.05s';
        }
        minHand.style.transform   =  `rotate(${minsDegrees}deg)`;
        //时针旋转的计算
        const hours               =  now.getHours();
        const hoursDegrees        =  (hours-12)*30+(mins/60)*30;
        hourHand.style.transform  =  `rotate(${hoursDegrees}deg)`;

    }
    setInterval(updata,1000);
    updata();
}

 function right(){
    const DATE = document.querySelector(".date");
    const WEEK = document.querySelector(".week");
    const TIME = document.querySelector(".time");
    function Adate(){
      const now = new Date();
      const weekList = ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"];
      const str = now.getFullYear()+"-"+now.getMonth()+"-"+now.getDay();
      DATE.innerHTML = str;
      WEEK.innerHTML = weekList[now.getDay()];
    }
    Adate();
    setInterval(Adate,24*3600);

    // 分钟，秒，不足两位时，用0进行凑位。
    function zero(arg){
      if(arg>=10){
        return arg;
      }else{
        return "0"+arg;
      }
    }
    // 显示当前时间的函数
    function Atime(){
      const now = new Date();
      const str = now.getHours()+":"+zero(now.getMinutes())+":"+zero(now.getSeconds());
      TIME.innerHTML=str;
    }
    Atime();
    setInterval(Atime,1000);
  }
  left();
  right();
