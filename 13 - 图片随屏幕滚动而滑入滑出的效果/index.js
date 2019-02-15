let imgs=Array.from(document.querySelectorAll("img"));//转换为真正的数组
        // imgs.forEach(item=>item.addEventListener("scroll",handle));
        window.addEventListener("scroll",throttle(handle,100));
        // 节流函数（定时器实现方式）
        function throttle(func,wait){
            let timeflag;
            return function(){
                let content=this;
                let args=arguments;
                if(!timeflag){
                    timeflag=setTimeout(function(){
                        timeflag=null;
                        func.apply(content,args)
                    },wait);
                }
            }

        }
        // 事件处理函数，每2秒执行一次，停止后也会执行一次。（无首有尾）
        // 判断图片位置的函数，遍历每一个图片，判断每一个图片是否出现在视图中，来决定是否加类。
        function handle(){
          imgs.forEach(img=>{
            let imgHalfBoolean=(window.scrollY+window.innerHeight)>img.offsetTop+img.height/2;//图片划过一半的判断条件
            let imgFullBoolean=window.scrollY<img.offsetTop+img.height;//图片没有完全滑入顶部的判断条件
            // 图片滑出一半且没有完全滑出时，加上过渡类
            if(imgHalfBoolean&&imgFullBoolean){
              img.classList.add("active");
            }else{
              img.classList.remove("active");
            }
          })
        }