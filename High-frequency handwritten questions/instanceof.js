####
1.The instanceof operator is used to check whether the prototype property of a constructor appears anywhere in the prototype chain of an instance object.
2.This method takes two parameters: an instance object and a constructor function
3.If obj is not an object or a function, it doesn't have a constructor, so it returns false.
4.If the constructor type is not a function, a type error occurs.
5.It retrieves the prototype of obj and searches up the prototype chain until it finds a prototype that matches the constructor.prototype property. If it finds one, it returns true; if it reaches the top of the prototype chain without finding a match, it returns false.

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
