####
  1.Define the function that takes an array of promises as its argument.
  2.The function should return a new promise.  
  3.Keep track of how many promises have resolved and store their results.  
  4.Loop through the array of promises and attach then and catch handlers.
  5.In the then handler, store the result and check if all promises have resolved.
  6.In the catch handler, reject the outer promise immediately.

````
    function promiseAll(promises) {
      return new Promise((resolve, reject) => {
        if(!Array.isArray(promises)) reject(new TypeError('arguments must be an array'));
        const resulte = [];
        let count = 0;
        promises.forEach((promise, index) => {
          Promise.resolve(promise)
            .then(result => {
              result[index] = result;
              count++;
              if(count === promises.length) resolve(results);
            })
          .catch(err => reject(err));
        })
      })
    }
````
