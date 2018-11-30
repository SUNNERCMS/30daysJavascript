/*
* @Author: Administrator
* @Date:   2018-11-29 09:54:44
* @Last Modified by:   Administrator
* @Last Modified time: 2018-11-30 11:34:30
*/
    const secondHand = document.querySelector('.second-hand');
    const minsHand = document.querySelector('.min-hand');
    const hourHand = document.querySelector('.hour-hand');

    let secondDeg = 0;
    let minDeg = 0;
    let hourDeg = 0;
//初始化函数，用来标定当前时间下时分秒的位置，遵循规则：小单位移动角度的效果累加到大单位上。
    function initDate() {
      const date = new Date();
      const second = date.getSeconds();
      secondDeg = second*6;  //一秒转动的角度为6°

      const min = date.getMinutes();
      minDeg = (min + second / 60)*6; //秒转换为分钟，一分钟转动的角度也是6°

      const hour = date.getHours();
      hourDeg = ((hour-12)+(min/60)+(second/3600)) * 30; //转化为小时,一小时转动的角度的30°
      secondHand.style.transform = `rotate(${ secondDeg }deg)`;
      minsHand.style.transform = `rotate(${ minDeg }deg)`;
      hourHand.style.transform = `rotate(${ hourDeg }deg)`;
    }
//跟新函数：每隔一秒计算一次，也即是每次增加1s,(1/60)分钟，(1/3600)小时
    function updateDate() {
      secondDeg += 1*6;
      minDeg += (1 / 60)*6;
      hourDeg += (1/3600)*30;
      secondHand.style.transform = `rotate(${ secondDeg }deg)`;
      minsHand.style.transform = `rotate(${ minDeg }deg)`;
      hourHand.style.transform = `rotate(${ hourDeg }deg)`;
    }

    initDate();
    setInterval(updateDate, 1000);

//通过初始化时分秒的位置，然后进行角度的累加