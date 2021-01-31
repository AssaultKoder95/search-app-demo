# Questions

Q1: Explain the output of the following code and why

```js
    setTimeout(function() {
      console.log("1");
    }, 100);
    console.log("2");
```

Ans: The o/p of the following is : 
```bash
2
1
```
The reason for the same is when the setTimeout API encountered in the event loop, it gets pushed to the call stack & isn't re-queued till the time passed as wait time hasn't passed. On the other hand, the console's log function doesn't depend on any other API & is executed immediately.

Q2: Explain the output of the following code and why

```js
    function foo(d) {
      if(d < 10) {
        foo(d+1);
      }
      console.log(d);
    }
    foo(0);
```

Ans: The output of the code is :
```bash
10
9
..
2
1
```
The reason for same is because as and when we call a function it gets pushed to the call stack, since we are calling it recursively, we basically have the following entries inside our call stack till the condition is false

```
foo(10)
foo(9)
foo(8)
foo(7)
...
```
Once the condition is false, we don't push anything to call stack & start processing the entries, since we pop in order therefore we get the resultant console above as o/p.


Q3: If nothing is provided to `foo` we want the default response to be `5`. Explain the potential issue with the following code:

```js
    function foo(d) {
      d = d || 5;
      console.log(d);
    }
```

Ans: In case of basic datatypes, it should be able to default to 5 but if we use empty array / object passed as an agrument to the function, we will get default value as empty array instead of 5 which is incorrect.

```js
const defaultValue = [] || 5 // defaultValue => []
const defaultValue = {} || 5 // defaultValue => {}
```

Q4: Explain the output of the following code and why

```js
    function foo(a) {
      return function(b) {
        return a + b;
      }
    }
    var bar = foo(1);
    console.log(bar(2))
```

Ans: This function is a classic example of closures, the o/p of the code will be 3 as the function foo returned a function which has `a` in it's outer scope & references its value when called. Closures are defined in order to bind the values of the variables present inside function body with the function that is returned.

```js
function surfaceAreaFinderWithFixedLength(length = 10) {
  return function(width = 10) {
    return length * width
  }
}

const fixedLengthParam = 50
const squareWidthParam = 50
const rectangleWidthParam = 10

const surfaceAreaFinder = surfaceAreaFinderWithFixedLength(fixedLengthParam) 
const squareSurfaceArea = surfaceAreaFinder(squareWidthParam) // results in 2500
const rectangleSurfaceArea = surfaceAreaFinder(rectangleWidthParam) // results in 500
```

Q5: Explain how the following function would be used

```js
    function double(a, done) {
      setTimeout(function() {
        done(a * 2);
      }, 100);
    }
```
Ans: One of the cases I feel this can be useful is for mimicking async tasks, our applications experience latency while communicating with different components across stack ( making network calls, making DB calls ) which can be mimicked using such function.

We expect the callback to be called as & when the task gets completed, for example, to notify the user with apt status.

I strongly believe we should avoid such patterns in our codebase as it cause scenario where we fully don't understand the async behaviour of the application ( should be refactored for better readability using Async/Await or Promises generic implementation )

PS: we can also redefine it to support custom timeout value in order to mimic our async task

```js
function double(value, customTimeout, callback) {
  setTimeout(function() {
    done(value * 2)
  }, customTimeout)
}
```
