/*
* @Author: Administrator
* @Date:   2018-11-30 20:09:45
* @Last Modified by:   Administrator
* @Last Modified time: 2018-12-03 22:17:32
*/
function spacingchange(){
    var spacing=document.querySelector("#spacing");
    document.body.style.setProperty('--spacing', spacing.value+'px');
    // var img=document.querySelector("#img");
    // img.style.padding=spacing.value+'px';一个需要改变的元素可以将其取出，改变它的对应项，但有100个需要改变的元素时，改变根变量值最有效。
}
function blurchange(){
    var blur=document.querySelector("#blur");
    document.body.style.setProperty("--blur",blur.value+'px');
    // document.documentElement.style.setProperty("--blur",blur.value+'px');
    // 在 JavaScript 中 document.documentElement 即代表文档根元素。所以要改变全局的 CSS 变量，可以这样写

}
function basechange(){
    var base=document.querySelector("#base");
    document.body.style.setProperty("--base",base.value);
}