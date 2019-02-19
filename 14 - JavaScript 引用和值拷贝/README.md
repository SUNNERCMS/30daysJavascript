### Day14 - JavaScript 引用和值拷贝

#### 项目效果
效果展示如下面的图片，另外也可以自行在浏览器的控制台中打印显示进行理解。

#### 按值操作（深拷贝）

基本类型由值操作。以下类型在JavaScript中被视为基本类型：

- `String`

- `Number`

- `Boolean`

- `Null`

- `Undefined`

基本数据类型赋值你可以理解成值拷贝，从深拷贝和浅拷贝的角度去思考的话，你可以理解成`深拷贝`，当你修改一个变量的值时，不会影响其他变量的值。

##### 实例

```Javascript
let age1 = 100; //number类型
let age2 = age1; //值的赋值属于深拷贝
console.log(age1, age2);  //100 100
age1 = 200;
console.log(age1, age2);  //200 100 
```
> 值的复制：是给另外一个变量创建了一个存储空间，二者彼此独立，修改数据互不影响。  
由此可见，基本类型，按值操作，新建的变量会将值复制给新的变量，各自的改变不会互相影响。

#### 通过引用操作 （浅拷贝）

对象`Object`类型是按引用操作的，如果它不是基本类型中的一个，那么它就是对象，这里如果我们细究的话，JavaScript中每一个东西都可以当做对象，甚至是基本的类型（不包括`null`和`undefined`），但我们尽量不要钻这个牛角尖。

一些JavaScript中的对象：

`Object`

`Function`

`Array`

`Set`

`Map`

那对于数组来说，情况是否一样呢？延续上面的思路,下面我们来看看数组。  
```JS
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
const team = players;
console.log(players, team); // ["Wes", "Sarah", "Ryan", "Poppy"] ["Wes", "Sarah", "Ryan", "Poppy"]
team[3] = 'Lux';
console.log(players, team); // ["Wes", "Sarah", "Ryan", "Lux"] ["Wes", "Sarah", "Ryan", "Lux"]
```
> 结果显示原数组 plaryers 也被修改了。为什么会这样？因为 team 只是这个数组的引用，并不是它的复制。team 和 players 这两个变量指向的是同一个数组，也即是仅仅浅拷贝了指针，这个变量存储的指向原来数组存储空间的方向，两个变量指向的内容是一样的，这样修改其中一个另一个也会跟着改变。   


#### 数组复制的解决方法 （数组深拷贝）：
- 方法一 Array.prototype.slice()  

由于运行 slice ，原数组不会被修改。所以如果修改这两个数组中任意 一个，另一个都不会受到影响。
```JS
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
const team2 = players.slice();
team2[3] = 'Lux2';
console.log(players, team2);  // ["Wes", "Sarah", "Ryan", "Poppy"] ["Wes", "Sarah", "Ryan", "Lux2"]
```
- 方法二 Array.prototype.concat()

concat() 方法是用来合并数组的，它也不会更改原有的数组，而是返回一个新数组，所以可以将 players 数组与一个空数组合并，得到的结果就符合预期了。
```JS
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
const team3 = [].concat(players); //或者写成 team3 = players.concat();
team3[3] = 'Lux3';
console.log(players, team3);  // ["Wes", "Sarah", "Ryan", "Poppy"] ["Wes", "Sarah", "Ryan", "Lux3"]
```
- 方法三 ES6 扩展运算符

扩展语法可以像扩展参数列表一样来扩展数组，效果与上述方法类似，但比较简洁。
```JS
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
const team4 = [...players]; //扩展运算符这里实际上是“打散操作”
team4[3] = 'Lux4';
console.log(players, team4);  //["Wes", "Sarah", "Ryan", "Poppy"] ["Wes", "Sarah", "Ryan", "Lux4"]
```
- 方法四 Array.from()
Array.from() 方法从一个类似数组或可迭代对象中创建一个新的数组实例。  
```JS
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
const team5 = Array.from(players);
team4[3] = 'Lux5';
console.log(players, team4);  //["Wes", "Sarah", "Ryan", "Poppy"] ["Wes", "Sarah", "Ryan", "Lux5"]
```
#### object对象的复制方法（对象深拷贝）

对于 Object 数据，我们用一个 person 对象来试试。

先声明对象：
```JS
const person = {
   name: 'Web sun',
   age: 25
 };
 ```
然后思考一下如何可以取得它的复制，试试想当然的做法：
```JS
const captain = person;
captain.number = 99;
console.log(person, captain);
// Object {name: "Web sun", age: 25, number: 99} 
// Object {name: "Web sun", age: 25, number: 99}
```
这样好像行不通，person 的值也被更改了，那该如何才能真正复制呢,来达到两个变量之间互不影响？

- 方法一 ES6的Object.assign()
`Object.assign(target, ...sources)`用于对象的合并，将源对象中的所有可枚举属性，复制到目标对象中，并返回合并后的目标对象。后来的源对象的属性值，将会覆盖它之前的对象的属性。    
```JS
var obj={
   name:'sun',
   height:'180cm'
 }
 var copyobj=Object.assign({},obj);
 copyobj.name='zhao';
 console.log(obj); //{name: "sun", height: "180cm"}
 console.log(copyobj); //{name: "zhao", height: "180cm"}
```
- 方法二 ES6的扩展运算符
用于取出参数对象的所有可遍历属性，拷贝到当前属性中。  
```JS
var obj={
   name:'sun',
   height:180cm
 }
 var copyobj={...obj};
 copyobj.name='zhao';
 console.log(obj); //{name: "sun", height: "180cm"}
 console.log(copyobj); //{name: "zhao", height: "180cm"}
```
#### 注意：上述对数组深拷贝的方法仅仅适用第一层级的值是基本数据类型的情况。若第一层级的值为对象或者数组等引用类型时，则上述方法失效。对象中若仍嵌套有对象，同样失效。
## 拷贝所有层级
##### 1.不仅拷贝第一层级，还能拷贝数组或对象所有层级的各项值。  
##### 2.不是单独针对数组或对象，而是能够通用与数组、对象和其他复杂的JSON形式的对象。
- 方法一 `JSON.parse(JSON.stringify(xxx))`
```JS
var array=[{number:1},{number:2},{number:3}];
var copyArray=JSON.parse(JSON.stringify(array));
copyArray[0].number=100;
console.log(array);//[{number:1},{number:2},{number:3}];
console.log(copyArray); //[{number:100},{number:2},{number:3}];
```
> 序列化：将一个JavaScript值（数组或对象）转换为一个JSON字符串；JSON.stringify()   
反序列化：将一个JSON字符串转换为对象；JSON.parse()
- 方法二 深拷贝递归函数
```JS
function deepcopy(obj){
   if(typeof obj == 'object') { //说明参数是一个对象类型，但是数组也是对象，需要具体判断是不是数组类型。
      var result = obj.constructor==Array ? [] : {};
      for(let i in obj){ //遍历obj的每一项
          result[i]=typeof obj[i]=="object" ? deepcopy(obj[i]) : obj[i];
      }
   }else{
      var result = obj;
   }
   return result;
}
```
