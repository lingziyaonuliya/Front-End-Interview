####
The new operator actually does four things:

1.Creates a new empty object.
2.Sets the prototype of the new object to the constructor's prototype property.
3.Sets the this of the constructor function to that object and executes the constructor (adding properties to the new object).
4.Determines the return value type. If it's a value type, it returns the created object. If it's a reference type, it returns the constructor's object.

````
function myNew(constructor, ...args) {
  if(typeof constructor !== 'function') throw new Error('constructor must be a function')
  const obj = Object.create(constructor.prototype)
  /** 
    let obj = new Object()
    obj.__proto__ = constructor.prototype
    Object.setPrototypeOf(obj, constructor.prototype)
  */
  const res = constructor.apply(obj, args)
  return res instanceof Object ? res : obj
}
````
