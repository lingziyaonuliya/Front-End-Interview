1.*instanceof* 运算符用于检测构造函数的 *prototype* 属性是否出现在某个实例对象的原型链上
2.该方法接收2个参数：一个**实例对象**、一个**构造函数**
3.若*obj*不是对象或函数，则作为基础数据类型不存在构造函数，返回*false*
4.若*constructor*类型不是函数，会出现类型报
5.获取*obj*的原型，沿原型链往上找，直到找到与*constructor.prototype*属性相同的原型返回*true*，到达原型链顶端仍未找到返回*false*

````
  function myInstanceof (obj, constructor) {
    if(typeof constructor !== 'function') retrun new Error("Right-hand side of 'instanceof' is not an object")
    if(obj === null || typeof obj !== 'object' || typeof obj !== 'function') return false
    let proto = Object.getPrototypeOf(obj)
    let prototype = constructor.prototype
    while(proto) {
      if(proto === prototype) return true
      proto = Object.getPrototypeOf(proto)
    }
    return false
  }
````
#### 
