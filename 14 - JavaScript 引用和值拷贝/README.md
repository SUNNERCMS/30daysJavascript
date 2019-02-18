### Day14 - JavaScript 引用和值拷贝

#### 项目效果
效果展示如下面的图片，另外也可以自行在浏览器的控制台中打印显示进行理解。

#### 按值操作

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

#### 通过引用操作

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

所以如何解决这个问题？接下来我们开始真正的复制吧！

方法一 Array.prototype.slice()

由于运行 slice 得到的结果是一个对原数组的浅拷贝，原数组不会被修改。所以如果修改这两个数组中任意 一个，另一个都不会受到影响。

const team2 = players.slice();
team2[3] = 'Lux2';
console.log(players, team2); 
方法二 Array.prototype.concat()

concat() 方法是用来合并数组的，它也不会更改原有的数组，而是返回一个新数组，所以可以将 players 数组与一个空数组合并，得到的结果就符合预期了。

const team3 = [].concat(players);
team3[3] = 'Lux3';
console.log(players, team3); 
方法三 ES6 扩展语法

扩展语法可以像扩展参数列表一样来扩展数组，效果与上述方法类似，但比较简洁。

const team4 = [...players];
team4[3] = 'Lux4';
console.log(players, team4);
方法四 Array.from()

此外使用 Array 创建新的数组实例的方法也是可行的。

const team5 = Array.from(players);
team5[3] = 'Lux5';
console.log(players, team5);
### 深拷贝

```js
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];

// 创建新数组并且将原来的数组拼接到新数组中
const team3 = [].concat(players);

// ES6 Spread语法
const team4 = [...players];
team4[3] = 'heeee hawww';
console.log(`team4:${team4}`);

const team5 = Array.from(players);
console.log(`team5:${team5}`);
```

![](http://om1c35wrq.bkt.clouddn.com/day14--03.png)

由上面的效果显示，但我们修改team4时，players并没有发生任何变化，上面的`contact`,`...`,`Array.from`都属于深拷贝，会将原来的内容重新拷贝一份，所以当你操作一个指针时不会影响原对象。


### 深拷贝 与 浅拷贝对比

```js
//创建object对象
const person = {
 name: '黎跃春',
 age: 29
};

// 浅拷贝
console.log(`person:${JSON.stringify(person)}`);
const captain = person;
captain.number = 99;
console.log(`person:${JSON.stringify(person)}`);
console.log(`captain:${JSON.stringify(captain)}`);

// 深拷贝
const cap2 = Object.assign({}, person, {
 number: 99,
 age: 12
});
console.log(`cap2:${JSON.stringify(cap2)}`);
console.log(`person:${JSON.stringify(person)}`);
```

![](http://om1c35wrq.bkt.clouddn.com/day14--04.png)

- `JSON.stringify`将对象转换成字符串，打印时效果清晰。
- `captain = person`属于浅拷贝
- `Object.assign`的三个参数中，第一个参数属于初始值，它最终的值是第二个和第三个参数的并集，如果第二个、第三个参数有相同的属性，那个第三个参数会覆盖第二个参数里面的值。

### 采用JSON字符串

```js
// 对象的嵌套
const liyc = {
 name: '黎跃春',
 age: 100,
 social: {
   sina: '黎跃春-追时间的人',
   facebook: '黎跃春'
 }
};

console.log(`liyc:${liyc}`);

const dev = Object.assign({}, liyc);
console.log(`dev:${dev}`);

const dev2 = JSON.stringify(liyc);
console.log(`dev2:${dev2}`);

const dev3 = JSON.parse(JSON.stringify(liyc));
console.log(`dev3:${dev3}`);
```
![](http://om1c35wrq.bkt.clouddn.com/day14--05.png)


首先调用`JSON.stringify()`方法将对象解析为字符串，再调用`JSON.parse()`方法，将字符串解析为对象，这是一个小技巧，在处理对象的复制时很有用。

