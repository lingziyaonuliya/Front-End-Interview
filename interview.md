###### 1.What data types are available in JavaScript？

There are eight data types in JavaScript，they are undefined, null, boolean, number, string, object, symbol, bigInt.

Where Symbol and BigInt are new data types in ES6:

1. Symbol represents a unique and **immutable** data type created to resolve possible global **variable** conflicts.
2. BigInt is a <u>numeric</u> type of data that can represent <u>integers</u> in any <u>precision</u> format. BigInt can be used to safely store and **manipulate** large integers, even if the Number is outside the range of safe integers that number can represent.

These data can be divided into primetive data types and reference data types:

1. Stack: raw data type(Undefined、Null、Boolean、Number、String)
2. Heap: References data types (objects, arrays, and functions)

 The difference between the two types is the storage location:

1. The original data type is a simple data **segment** directly stored in the stack, which occupies a small space and has a fixed size, and belongs to the frequently used data, so it is stored in the stack.
2. An object whose data type is stored in the heap, occupying a large space and having an unfixed size. If stored in the stack, it will affect the performance of the program. The reference data type stores a pointer on the stack that points to the starting address of the **entity** in the heap. When the **interpreter** looks for a reference value, it first **retrieves** its address in the stack and then retrieves the entity from the heap.

The concepts of heap and stack exist in data structures and operating system memory:

-  In the data structure, the access mode of the data in the stack is first in, last out.
- The heap is a **priority** queue, sorted by priority, which can be **specified** by size.

In operating systems, memory is divided into stack and heap areas:

-  The stack memory is **automatically** **allocated** and released by the **compiler** to store the **parameter** values of functions and the values of local variables. It operates like a stack in a data structure.
- Heap area memory is usually freed by the developer allocation, and if the developer does not free it, it may be reclaimed by the **garbage collection mechanism** at the end of the program.

###### 2. How to detect data types?

typeof: array、object and null will be judged to be an object.

instanceof: The instanceof operator tests to see if the prototype property of a constructor appears anywhere in the prototype chain of an object. 

###### 3.What are the ways to determine an array?

ES6: 

```javascript
Array.isArrray(obj);
```

ES5: 

```
Object.prototype.toString.call(obj).slice(8,-1) === 'Array';
obj.__proto__ === Array.prototype;
obj instanceof Array
```

###### 4.The difference between null and undefined?

They are both primitive data type, undefined means there is no definition, null means an empty object. If you use double equal sign to compare them,it will return true and if you use three equal sign to compare them, it will return false.

###### 5.How to realize a instaceof operator?

The instanceof operator is used to determine whether the constructor's prototype property appears anywhere in the object's prototype chain.

```javascript
const myInstanceof = (left, right) => {
  let proto = Object.getPrototypeOf(left)
  let prototype = right.prototype
  while(true) {
    if(!proto) return false
    if (proto === prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}
```

###### 6.Why 0.1 + 0.2 !== 0.3, how to make it equal?

###### 7.What is Block Formatting Context?

A BFC is a part of a visual CSS rendering of a web page, and it has its own set of rendering rules.

###### 8.What is Prototypal Inheritance? How does it work?

In JavaScript, objects have a special hidden property prototype. That object is called “a prototype”.

When we read a property from an object, and it’s missing, JavaScript automatically takes it from the prototype. In programming, this is called “prototypal inheritance”.

###### 9.Talk about arrow function.

- The arrow function is simpler:
  1. No arguments can be written directly to empty parentheses
  2. Only one parameter can be omitted from parentheses
  3. Only one sentence of the return value can omit curly braces

- The arrow function doesn't have its own 'this', it only inherits 'this' at the upper level of its scope
- The 'this' pointer inherited by the arrow function never changes
- The arrow function does not have its own arguments; it accesses the arguments value of its outer function
- Arrow functions do not have prototype, Call () , bind () , apply () can not change the 'this' direction of an arrow function

###### 10.What is Closure and how does it work?

A closure is a function that has access to a variable in the scope of another function.

The most common way to create a closure is to create a function A within a function B that has access to a local variable of the function B.

The first use of closure is to allow us to access variables of inside function from outside function. By using closure, you can access variables inside a function externally by calling the closure function externally, and you can use this method to create private variables.
Another use of closures is to keep a variable object in memory in the context of a function that has already been run. Because the closure function retains a reference to the variable object, the variable object is not reclaimed.

###### 11.'var' vs let' vs 'const'

Var has no block-level scope, let and const do
Var can be declared repeatedly, but let and const can not
When variables are declared, Var and const must be set with initial values, which let can do without
Variables created by let can change pointer pointers, and variables declared by const are not allowed to change pointer pointers

###### 12.Explain the concept of Promise

Promise is a solution for asynchronous programming.

The Promise instance has only three states:
1. pending
2. resolve
3. reject

the state of the object is not affected by the outside world, once the state changes it will not change again.
The Promise constructor takes a function with two arguments: resolve and reject:

1. The purpose of resolve is to change the state of the Promise object from“Unfinished” to“Successful.”
2. What reject does is it changes Promise from“Unfinished” to“Failed.”

###### 13.Difference between `==` and `===`

When using the double equal sign for equality, if the types on both sides are not identical, a cast is performed before the comparison.
When using the third equal sign for equality, if the two types are not the same, do not do forced type substitution, directly return false.

###### 14.What is Event Delegation?

Event Delegation is a pattern to handle events efficiently. Instead of adding an event listener to every element, we can add an event listener to a parent element and call an event on a particular target by using the .target property of the event object.

Event delegation is implemented using the bubbling principle of events:

1. Determine the parent element of the event element to add
2. Define events for parent elements and listen for bubbling events for child elements
3. Use event. Target to locate the child element that triggered the event bubble

###### 15.Explain the differences between CommonJS and ES modules

Both CommonJS and ES6 modules can assign values to the incoming object.

CommonJS is a shallow copy of the module, ES6 Module is a reference to the module, that is, ES6 Module is read-only.

###### 16.Explain 'new' operator in JavaScript. What exactly does it do?

The new operator is used to create an instance object for a given constructor.

The execution process is like:

1. Create a new empty object
2. Sets the prototype of the object to the prototype of the constructor
3. Let the function's this point to the object and add the constructor's properties to the new object
4. Determines the return type of the function, If it is a value type, return the created object. If it is a reference type, it returns the object of that reference type.

###### 17.Explain 'macrotask' and 'microtask'

- Each time the stack executes, the code executed is a macrotask.

Macrotask include: script execution, setTimeout, setInterval, setImmediate, as well as I/O operations, UI rendering and so on.

- A task that is executed immediately after the execution of the current task is a microtask.

Microtask  include: Callback for promise, mutation observer that listens for DOM changes.

###### 18.What happens when you type a URL in browser's address bar?

1. URL resolution
2. DNS queries
3. TCP connection
4. HTTP request
5. Respond to the request
6. Page rendering

###### 20.Explain 'async' and 'await'

Async/await is the ultimate Promise-based solution to asynchrony.

Async is equivalent to 'then () ' and await is equivalent to the operation inside the 'then () ' parentheses.

Async is a modifier in front of the function, and the function defined by async returns a value of resolve in the Promise object by default. So you can use the then method on the async function, and the return value is the function that the then method passed in.

Await is also a modifier that can only be placed within the function defined by async.
If await modifies the Promise Object: you can retrieve what is returned in Promise, and the statement will not execute until it gets the value;
If not the Promise object: treat this non-Promise as the result of the await expression.

###### 21.Cookie vs localStorage vs sessionStorage

Cookies: is a way for the server to record the status of a user, stored on the client side. A cookie can store up to 4K of data, its lifetime is specified by the expires attribute, and the cookie can only be shared by page access of the same origin.

Sessionstorage: a browser-local storage method. It can store up to 5 megabytes or more of data, it fails when the current window is closed, and sessionStorage can only be accessed and shared by the same window's page.

Localstorage: a browser-local storage method, and it can also store 5 megabytes or more of data. Unlike sessionStorage, it does not fail unless you remove it manually, and localStorage can only be accessed and shared by the same source page.

###### 22.What is the difference between Repaint and Reflow?

When the size, structure, or attributes of some or all of the elements in the rendering tree change, the browser will re-render some or all of the document called reflow.

When the style of some elements on the page changes, but does not affect their position in the document flow, the browser redraws the elements, which is the process of redrawing.

Reflow does trigger repainting, but repainting does not necessarily trigger reflow.

###### 23.How Garbage collection in JavaScript works?

Garbage collection algorithm is garbage collection periodically at regular intervals to find variables that are no longer in use and to clear or free memory.

###### 24.What is memory leak ? How to debug and prevent it?

A memory leak is a block of memory that is no longer used or needed by a program, but is not freed for some reason and is still occupied unnecessarily.

- Use strict mode to avoid global variables.
- When the timer is done, manually clear the timer
- Clean up after using closure and Dom

###### 25.Explain Event Loop in Browser

Because JS runs in a single thread, it keeps the code in order by pushing the executing context of different functions onto the execution stack.

1. The synchronization is performed first
2. After execution, check to see if the stack is empty
3. If empty, see if there are any micro-tasks to perform, and if so, put them on the stack.
4. Check to see if there are any macro-tasks to perform, and if so, put them on the stack.

###### 26.What is Virtual DOM? How does it work?

The Virtual DOM is a concept used by modern front-end libraries and frameworks to optimize the performance of web applications. 

When we make changes to the Virtual DOM, the library or framework can compare the changes to the current state of the Virtual DOM and determine the minimum number of changes required to update the actual DOM. 

###### 27.What is Array-Like Objects in JavaScript?

An array-like object is an object with length and index properties, but the array-like object can not use array methods.

We can use Array.from(array-like) method to convert an array-like object to an array.

###### 29.How to resolve a bunch of Promises in order?

###### 30.What is Factory Pattern?

The factory pattern does not expose the concrete logic for creating the object, but encapsulates the logic in a function that can then be considered a factory.

###### 31.What is Proxy Pattern?

The Proxy Pattern creates a Proxy object for the target object to control access to the target object.

###### 32.How to find the Performance Bottleneck of a web app?

Collect performance data

###### 33.What is the difference between setTimeout and setInterval?

setTimeout calls function after duration milliseconds from now.The method executes only once.

setInterval calls function after every duration milliseconds.The method executes multiple times.

###### 34.How to implement lazy load for images?

The implementation principle of lazy loading is to set the src attribute of the image on the page to an empty string, save the real path of the image in a custom attribute, and judge when the page scrolls if an image enters the visible area of the page, the src attribute assigned to the image by the real path is extracted from the custom attribute to achieve the delayed loading of the image.

###### 35.How would you debug a web page and find the bad code?

Set breakpoints. In Chrome, breakpoints are identified as blue arrows on top of the line number.

Use console.log, to print the value of variables, functions, inputs and outputs to check the logic we have in our mind against what is really happening in our code. 

###### 38.How to get a secure undefined value?

The expression void does not return a value, so the return result is undefined.So you can use void 0 to get secure undefined.

###### 39.What is the difference between deep copy and shallow copy?

Shallow copy is create a new data that has a copy of the original data property value.

Deep copy opens up a new stack where two object attributes complete the same, but correspond to two different addresses. Modifying the attributes of one object doesn't affect the other.

###### 40.The difference between a map and a weakMap?

A Map object is a collection of key/value pairs.

A WeakMap is a collection of key/value pairs whose keys must be objects, with values of any arbitrary.

###### 41.The difference between a Set and a weakSet?

A Set object stores unique values of any type.

A weakSet is a collection of weakly held objects, all objects in a WeakSet's collection are unique.

###### 42.What are the native methods for arrays?

toString()、toLocalString()、join()

pop() 、push() end of the array

shift()、unshift()  top of the array

concat()、array truncation method slice () 、array insertion method splice ()

iterative methods every () , some () , Filter () , map () , and forEach ()  

array merge methods reduce () 

###### 42.What is AJAX?

Ajax refers to asynchronous communication through JavaScript, taking an XML document from the server and extracting the data from it, then updating the corresponding part of the current page without refreshing the entire page.

1. Create an XMLHttpRequest object.
2. Use open method to create an HTTP request which the params are the method of the request、the address of the request、and the user's authentication information.
3. Add some information and a listener function to this object before you issue the request.
4. Finally, calls send() to initiate the request to the server.

###### 43.What are the common DOM operations?

- Get the DOM node:

  ```javascript
  getElementById // 按照 id 查询
  getElementsByTagName // 按照标签名查询
  getElementsByClassName // 按照类名查询
  querySelectorAll // 按照 css 选择器查询
  ```

- Create the DOM node:

  ```javascript
  document.createElement('span') 
  ```

- Delete the DOM node:

  ```javascript
  removeChild(targetNode)
  ```

Modify the DOM node:

```javascript
insertBefore(content, title)
```

###### 44.What does“Use strict” mean? 

Use strict is an ES5-added running mode.

1. The `with` statement is disabled.
2. Disallow the this keyword from pointing to global objects.
3. Objects can not have properties with duplicate names.

###### 45.The difference between `for. . in` and `for. . of`

Both `for...in` and `for...of` statements iterate over something. The main difference between them is in what they iterate over.

`for...in` statement iterates over the enumerable string properties of an object, while the `for...of` statement iterates over values that the iterable object defines to be iterated over.

In a word, `for. . in` loops are designed primarily to traverse objects, not arrays; `for... of` loops can be used to traverse array, array-like, string, Set, Map, and Generator object.

###### 46.What's the difference between the forEach and map?

Both of these methods are used to traverse an array.

The forEach () method performs the provided function on each element, and the operation on the data changes the original array.
The map () method does not change the value of the original array. It returns a new array whose values are the value after the original array call target function.

###### 47.What is the difference between call () and apply () ?

They work exactly the same, except that the parameters are passed in different forms.

Their first argument specifies a point to the this object. The second parameter of apply() is a subscript collection.

And the call() passes in a variable number of arguments, starting with the second argument, each argument is passed in turn to the function.

###### 48.Explain 'this' operator in JavaScript. 

'this' is an attribute in the executing context. It points to the object that last called this method.

There are four modes to determine the reference to 'this'

1. When 'this' is used in a global scope, it points to a global object.
2. When we call a function as a method of an object, 'this' points to the calling object.
3. Call () , bind () , or apply () can specify the 'this' pointer to the calling function.
4. When a function is called with 'new' , a new object is created before the function executes, and 'this' points to the newly created object.

###### 49.What's the difference between GET and POST?

The Get() requests a representation of a specified resource, and requests that use GET should only be used to retrieve data.

The POST() is used to commit an entity to a specified resource, usually resulting in a state change or side effect on the server.

GET requests are automatically cached by the browser, while POST requests are not, unless set manually.

###### 50.What is debounce and throttling? What is the difference?

Throttling: only runs once in n seconds, only takes effect once if triggered repeatedly in n seconds.
Debounce: this event is executed after n seconds and is timed again if it is triggered repeatedly within n seconds.

##### HTML

###### 1.The difference between src and href.

Src and href are both used to refer to external resources, and they differ as follows:

Src represents a reference to a resource, and the content it points to is embedded in the location of the current label. SrC downloads and applies the resources it points to into the document.

Href represents a hypertext reference that points to some network resource and establishes a link to the current element or this document.

###### 2.The difference between defer and async in script tags.

The defer and async attribute both loads external JS script files asynchronously, and neither of them blocks page parsing.

The async attribute, which indicates that the subsequent loading and execution of the document is done in parallel with the loading and execution of the JS script.

The defer attribute, the process of loading subsequent documents, and the JS script are loaded in parallel. The JS script is executed only after all the elements of the document have been parsed.

##### CSS

###### 1.The difference between Link and @import.

When link references CSS, it loads at the same time as the page loads. @import requires the page to load after the page has fully loaded.

Link has no compatibility issues which @import does.

Link supports using Javascript to control the DOM to change styles but @import doesn't.

###### 2.Single-line and multi-line text overflows are omitted.

- A single line of text overflows

  ```css
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ```

- Multi-line text overflow

  ```css
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -weblit-line-clamp: 3;
  ```

##### open

###### 1.What is the newest web technique that you are interested in?

Webassembly can improve development efficiency and reduce the time spent uploading a web site.

Blockchain: Data is stored on a network, making it easily available to users.

Flutter: Flutter has many beautiful Material Design widgets, allowing developers to quickly build beautiful user interfaces to provide a better user experience.

###### 2.What technologies are you learning right now? and what do you plan to learn?

I've been learning typescript recently, and its typing mechanism helps me write more robust and maintainable code.

###### 3.What is your strength and weakness?

Well, I'm afraid that I tend to get hung up on details, and it may affect my efficiency.I fully realize that now, so I make a clear plan before each task to enable that I can finish the job within the scheduled time.

I suppose my strengths are I'm perfectionist and a fast-learner.

###### 4.How do you relate to others?

I prefer to work with others, we can help each other, solve problems together, so work more effectively.

I am good at teamwork, because I am a good communicator, when I encounter difficulties, I will seek the help of colleagues, when colleagues have difficulties I will try to help him.

I'm very co-operative and have good teamwork spirit.



#### DOM operations

1. common DOM node acquisitions

```html
getElementById // 按照 id 查询
getElementsByTagName // 按照标签名查询
getElementsByClassName // 按照类名查询
querySelectorAll // 按照 css 选择器查询
```

2. create DOM node

````html
// 创建新节点
var targetSpan = document.createElement('span')
// 设置 span 节点的内容
targetSpan.innerHTML = 'hello world'
// 把新创建的元素塞进父节点里去
container.appendChild(targetSpan)
````

3. Delete DOM node

````html
// 删除目标元素
container.removeChild(targetNode)
````

4. Modify DOM node

````html
// 交换两个元素，把 content 置于 title 前面
container.insertBefore(content, title)
````



匿名函数-anonymous function-/ əˈnɒnɪməs /

#### Please tell me what equality means in JavaScript.

In JavaScript, equality refers to the comparison between two values to determine if they are equal. However, JavaScript has two different equality operators: `==` (loose equality) and `===` (strict equality), each with its own set of rules for determining equality.

1. **Loose Equality (`==`)**:
   - The loose equality operator (`==`) checks if two values are equal after performing type coercion. This means that if the types of the operands are different, JavaScript will attempt to convert them to the same type before comparing.
   - For example, `1 == '1'` will return `true` because JavaScript will coerce the string `'1'` to the number `1` before comparing.
   - However, loose equality can lead to unexpected results due to its type coercion behavior, so it's generally recommended to avoid using it.
2. **Strict Equality (`===`)**:
   - The strict equality operator (`===`) checks if two values are equal without performing type coercion. It compares both the values and their types.
   - For example, `1 === '1'` will return `false` because the types of the operands are different (number and string).
   - Strict equality is considered more reliable and predictable than loose equality, as it does not perform any type coercion and always requires the operands to have the same type.

In general, it's recommended to use strict equality (`===`) in JavaScript for most comparisons, as it avoids potential issues related to type coercion and produces more predictable results. Loose equality (`==`) should be used with caution, as it may lead to unintended consequences due to its type coercion behavior.



#### Can you name one typical case where you would use anonymous functions?

#### Please tell me how you would check if a variable is null or undefined.

#### Could you explain how to eliminate value duplicates in an array?

#### Realize call()、apply()

- call function implementation steps:
  1. Determines whether the calling object is a function
  2. Determines whether an incoming context object exists, if not, set it as window
  3. Handle the passed-in arguments, intercepting all the arguments after the first one
  4. Take a function as a property of a context object
  5. Use the context object to call this method and save the return result
  6. Removes the function bound to the context object
  7. Return results

````javascript
Function.prototype.myCall = function (context, ...args) {
	if(typeof this !== 'function' ) throw new Error('type error!');
  context = context || window;
  const key = Symbol();
  context[key] = this;
  let result = context[key](...args);
  delete context[key];
  return result;
}
````

- apply function implementation steps:

  1. The difference between call() and apply() is that the second argument of apply() must be an array with multiple arguments.

- Bind function implementation steps:

  1. The difference between apply() and bind() is that bind() returns a bound function. So it need to return a function, the other operations are the same with apply()

  ````javascript
  Function.prototype.myBind = function (context, ...args) {
  	if(typeof this !== 'function' ) throw new Error('type error!');
    const fn = this;
    return function Fn () {
      return fn.apply(
        this instanceof Fn ? this : context,
        args.concat(...args)
      )
    }
  }
  ````

  

#### Talk about Promise

Promise is a solution to asynchronous programming. A Promise  takes a function as an argument and returns an instance of Promise. A Promise instance has three states, pending, resolved, and rejected, which represent ongoing, successful, and failed states, respectively. The state of an instance can only be resolved or rejected by pending, and once the state is changed, it can not be changed again.

The change of state is accomplished through the resolve () and reject () functions.

````javascript
class MyPromise {
  constructor(exe) {
    this.state = 'pending';
    this.value = null;
    this.reason = null;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    
    const resolve = value => {
      if(this.state === 'pending') {
        this.state = 'fulfilled'
        this.value = value
        this.onFulfilledCallbacks.forEach(fn => fn(value))
      }
    };
    
    const reject = reason => {
      if(this.state === 'pending') {
        this.state = 'rejected'
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn(reason))
      }
    };
    
    try {
      exe(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  
  then(onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
      if(this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            const result = onFulfilled(this.value)
            resolvePromise(result, resolve, reject)
          } catch (error) {
            reject(error)
          }
        });
      }
      
      if(this.state === 'rejected') {
        setTimeout(() => {
          try {
            const result = onRejected(this.reason)
            resolvePromise(result, resolve, reject)
          } catch (error) {
            reject(error)
          }
        });
      }
      
      if(this.state === 'pending') {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const result = onFulfilled(value)
              resolvePromise(result, resolve, reject)
            } catch (error) {
              reject(error)
            }
          });
        });
        
        this.onRejectedCallbacks.push((reason) => {
          setTimeout(() => {
            try {
              const result = onRejected(reason)
              resolvePromise(result, resolve, reject)
            } catch (error) {
              reject(error)
            }
          });
				});
      }
    })
  }
}

function resolvePromise(result, resolve, reject) {
  if(result instanceof MyPromise) {
    result.then(resolve, reject)
	} else {
    resolve(result)
  }
}
````



#### Asynchronous control concurrency

````javascript
function limitRequest(url = [], limit = 3) {
	return new Promise((resolve, reject) => {
    const len = urls.length
    let count = 0;
    
    while(limit > 0) {
      start()
      limit -= 1
    }
    
    function start() {
      const url = urls.shift()
      if(url) {
        axios.post(url).then(res => {
          // to do sth...
        }).catch(error => {
          // to do sth...
        }).finally(() => {
          if(count == len - 1) {
            resolve
          } else {
            count++
            start()
          } 
        }
       )
      }
    }
    
  })
}
````



#### Realize a new operator

1. create an empty object
2. 



#### Inheritance in Javascript

- ES5 inheritance

````js
// father class
function Animal (name) {
  this.name = name;
}

// method of father class
Animal.prototype.sayName = function () {
  console.log(`I am ${this.name}`)
}

// son class
function Dog (name) {
  // inhert the prototype from father
  Animal.call(this, name);
}

Dog.prototype = Object.create(Animal.prototype)
Dog.prototype.constructor = Dog

let dog = new Dog('kaka')
dog.sayName()
````



- ES6 inheritance

````js
class Animal {
  constructor(name) {
    this.name = name
  }
  say() {
  	console.log(`I am ${this.name}`)  
	}
}

class Cat extends Animal {
  constructor(name, color) {
    super(name)
    this.color = color
  }
  about() {
    console.log(`I am a ${this.color} cat named ${this.name}`)
  }
}

let miao = new Cat('mimi', 'white');
miao.say();
miao.about();
````



#### Promise.all()

1. Receive a Promise instance array as the arguments
2. returned a new Promise object
3. traverse the parameters passed in, use Promise.resolve() to warp them as a Promise object
4. The returned value array is in the same order as the arguments
5. If one og the parameter arrays fails, a failure state is triggered.And the first Promise error message that triggers a failure as an error meessage for Promise.all

````javascript
function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    if(!Array.isArray(promise)) {
      reject(new TyprError('Argumnets must be an array!'))
      return;
    }
    
    let successCount = 0;
    const results = new Array(promise.length);
    
    promise.forEach((promise, index) => {
      Promise.resolve(promise).then(result => {
        results[index] = result;
        successCount++;
        
        if(successCount === promise.length) {
          resolve(results);
        }
      }).catch(error => {
        reject(error);
      })
    })
  })
}
````



#### Publish-Subscribe Pattern

````js
class EventEmitter {
	constructor() {
    this.events = {};
  }
  
  // Subscribe events
  subscribe(eventName, listener) {
    if(!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
    return () => {
      unsubscribe(eventName, listener);
    }
  }
  
  unsubscribe(eventName, listener) {
    if(this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(fn => fn !== listener)
    }
  }
  
  publish(eventName, ...args) {
    if(this.events[eventName]) {
      this.events[eventName].forEach(listener => listener(...args)) 
    }
  }
}
````



#### Side show

````js
const carousel = document.getElemnetById('carousel')
const slides = document.querySelectorAll('.slide')
const pauseButton = document.getElementById('pauseButton')

let currentIndex = 0;
let intervalId = null;
let isPaused = false;

function nextSlide() {
  const nextIndex = (currentIndex + 1) % slides.length;
  const currentSlide = slides[currentIndex];
  const nextSlide = slides[currentIndex];
  
  currentSlide.style.transform = 'translateX(-100%)';
  nextSlide.style.transform = 'translateX(0)';
  currentIndex = nextIndex;
  
  function startCarousel() {
    intervalId = setInterval(() => {
      if(!isPaused) {
        nextSlide()
      }
    }, 2000)
  }
  
  function pauseCarousel() {
  	clearInterval(intervalId);  
	}
  
  pauseButton.addEventListener('click', () => {
    isPaused = !isPaused
    if(isPaused) {
      pauseButton.textContent = 'Resume';
      pauseCarousel();
    } else {
      pauseButton.textContent = 'Pause';
      startCarousel();
    }
  })
  
  startCarousel();
}
````

#### Deep clone

````js
function deepClone(obj, cache = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  
  if (cache.has(obj)) return cache.get(obj) // 如果出现循环引用，则返回缓存的对象，防止递归进入死循环
  let cloneObj = new obj.constructor() // 使用对象所属的构造函数创建一个新对象
  cache.set(obj, cloneObj) // 缓存对象，用于循环引用的情况

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], cache) // 递归拷贝
    }
  }
  return cloneObj
}

// 测试
const obj = { name: 'Jack', address: { x: 100, y: 200 } }
obj.a = obj // 循环引用
const newObj = deepClone(obj)
console.log(newObj.address === obj.address) // false
````



#### Sum function

````js
const sum = (...args) => {
  const add = (...args2) => {
    args = [...args, ...args2]
    return add
  }
  add.valueOf = () => args.reduce((prev, cur) => prev + cur, 0)
  return add
}

const mul = (...args) => {
  const times = (...args2) => {
    args = [...args, ...args2]
    return times
  }
  times.valueOf = () => args.reduce((prev, cur) => prev * cur)
  return times
}

console.log(mul(2, 3)(2).valueOf()) //12
````



#### List convert to Tree structure

````js
const arrayToTree = (array) => {
	
}
````



#### Event delegation

````html
<div id="productList">
  <div class="product">
    <span>商品1</span>
    <button class="addToCart">加入购物车</button>
  </div>
  <div class="product">
    <span>商品2</span>
    <button class="addToCart">加入购物车</button>
  </div>
  <!-- 更多产品 -->
</div>
````



````js
document.getElementById('productList').addEventListener('click', function(evnet) {
  if(event.target.classList.contains('addToCart')) {
    const productElement = event.target.parentElement;
    const productName = productElement.querySelector('span').textContent;
    addCartTo(productName);
  }
});

const shoppingCart = [];
function addToCart(productName) {
  const product = {
    name: productName,
    quantity: 1
  };
  const existingProductIndex = shoppingCart.findIndex(function(item) {
    return item.name === productName;
  });
  if (existingProductIndex !== -1) {
    shoppingCart[existingProductIndex].quantity++;
  } else {
    shoppingCart.push(product);
  }
}
````

































