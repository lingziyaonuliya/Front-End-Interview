1. Client-Side Routing & SPA Architecture
#### What is front-end routing and why is it essential for SPAs?
Front-end routing (or client-side routing) is a technique where the browser manages navigation and UI updates without requesting a new HTML document from the server.

In a Single Page Application (SPA), which typically serves a single index.html, front-end routing is crucial for:

Stateful Navigation: Allowing users to use the browser's "Back" and "Forward" buttons seamlessly.

Deep Linking: Enabling specific UI states to be bookmarkable and shareable via unique URLs.

##### What is the difference between Hash Mode and History Mode?

The main difference between hash mode and history mode is how the URL looks and how the routing is handled under the hood.

Hash Mode: Utilizes the # symbol in the URL and listens for the hashchange event. Since the hash portion is never sent to the server, it requires zero server-side configuration.

History Mode: Leverages the HTML5 History API (pushState and replaceState) to create "clean" URL paths.

The Trade-off: It offers better SEO and professional URLs but requires a server-side fallback to index.html to prevent 404 errors upon page refresh.

#####  How the History API Works (pushState & replaceState)

The History API allows JavaScript to manipulate the browser's session history stack without triggering a page reload.

When the route changes, the router uses `pushState()` to add a new entry to the browser's history stack, or `replaceState()` to modify the current entry.

This allows users to use the browser's **Back** and **Forward** buttons seamlessly. Crucially, these methods update the URL **without** triggering a page reload or sending a real HTTP request to the server.

#####  How do you pass parameters between roots?

- Dynamic route params: define a placeholder in the router configuration, usually with a colon.

`/user/:id`

- Query parameters: add key-value pairs at the end of the URL after a question mark.do not require changing the route configuration.

`/search?keyword=value&sort=desc`

Route state: pass complex objects through the router's history state without showing them in the URL

`router.push({ path: '/detail', state: { userData } })`

##### what is batching in the context of Api requests?

**Batching** means combining multiple small requests into **one single network call**.

2. Build Optimization: Minification & Obfuscation

##### Talk about the difference between Minification and Obfuscation

Minification is a performance optimization. It reduces file size by removing whitespace, comments, and shortening variable names (mangling) without changing the code's logic.

Obfuscation is a security measure. It transforms code into a complex, cryptic version to hinder reverse-engineering.

Performance Impact: Excessive obfuscation can increase bundle size and complicate the Abstract Syntax Tree (AST) parsing, potentially preventing the JS engine from performing JIT (Just-In-Time) optimizations.

##### Does obfuscation affect performance?

Yes, Heavy obfuscation adds dummy code, increasing the bundle size. The browse needs more time to parse the messy AST.

As modern JS engines try to otimize code.Obfuscation makes logic unpredictable, which prevents the engine from optimizing it, causing slower execution.

So, it's recommended to heavily obfuscate the specific critical parts, not the entire UI library.

##### How Tree Shaking works? And how does it relate to minification?

Tree Shaking is a technique we use to remove **dead code**.It analyzes the `import` and `export` statements in code to detect which modules are never used, and removes them from the final bundle.

It relates to minification because they share the same goal: **performance**. Usually, Tree Shaking happens first to remove the garbage, and then Minification happens to compress the rest.

##### Why do we sometimes break production code after minification? 

Here are 3 most common reasons why this happens:

1. Minifiers rename variables to save space.But if the code relies on the string name of the <u>variable</u>, it breaks.
2. Variable Mangling, so if the code relies on specific class name or function name, the minifier rename them to single letters, The breaks any logic that checks for the original name.
3. Side effects, after tree shaking, it may removes code that looked useless but was actually important.

##### Can you explain how a mini fair works internally?

A minifier works like a recycling plant, here  are 3 steps that minifier use internally:

1. it parses the original code into an AST (Abstract Syntax Tree)
2. it runs Transformations on this tree, and applies Mangling and Compression to modify it
3. it generates the new code string from that optimized tree, printing it out as possible without spaces.

##### How does JavaScript handle asynchronous tasks without blocking the UI?

As JavaScript engine itself is single-threaded, it only has CallSatck and only do one thing at a time.So it has the Web APIs to handle the tasks, and we called Event Loop.

1. Delegation: When the code encounters an async operation, JS hands it over to the Web APIs and immediately moves on to teh next line.Keeping the main thread free.
2. Queue: Once the async operation finishes in the background, its callback is pushed into a Task Queue.
3. The Event Loop: The event Loop use to check if the CallSatck is empty.

So js remains non-blocking by offloading takss to the bowser and executing the results only when the main thread id idle.

##### What are the main advantages of using async/await over raw Promises?

The main advantage is readability.Async/await allows us to write asynchronous code that looks like synchronous code.

And there are three main benefits:

1. Cleaner code: with async/await we don't need to chain multiple `.then()` , avoiding nesting codes that makes the code linear and easier to understand.
2. Error handling: It's convenient to use `try...catch` blocks to handle errors. This is much more intuitive than using `.catch()`.
3. Complex logic: Handling asynchronous operations inside loops (like `for...of`) is straightforward with await, but very complex with raw Promises.

##### How do you handle multiple asynchronous requests at the same time?

It depends on whether the requests are dependent on each other or independent.

- Independent request: 

  I usually use `Promise.all()` which accepts an array of Promises and runs them concurrently. However, as `Promise.all()` fails immediately if one request fails, so if I need to handle partial successes I prefer using `Promise.allSettled()`. It waits for all requests to finish, regardless of success or failure.

- Dependent request:

  If the second request needs data from the previous one, I have to execute them sequentially using `await`

#####  What is the purpose of the HTTP OPTIONS method?

Options is a Http method for CROS Preflight Request.

It's purpose is to check with the server if the actual request is safe to send.If the server responds with the correct `Access-Control-Allow-` headers, the browser proceeds with the real request. If not, the request is blocked.

##### What's the output of the code?
```javascript
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

async1();

new Promise(function(resolve) {
  console.log('promise1');
  resolve();
}).then(function() {
  console.log('promise2');
});

console.log('script end');
```
`script start -> async1 start -> async2 -> promise1 -> script end -> async1 end -> promise2 -> setTimeout`

```javascript
console.log(1);

async function fn() {
    console.log(2);
    await console.log(3); // 注意这里 await 后面直接跟了一个 console.log
    console.log(4);
}

new Promise((resolve) => {
    console.log(5);
    resolve();
    console.log(6);
}).then(() => {
    console.log(7);
});

fn();

console.log(8);
```

`1 -> 5 -> 6 -> 2 -> 3 -> 8 -> 7 -> 4`

```javascript
async function async1() {
  console.log('A');
  await async2();
  console.log('B');
}

async function async2() {
  console.log('C');
}

console.log('D');

setTimeout(function() {
  console.log('E');
}, 0);

async1();

new Promise(function(resolve) {
  console.log('F');
  resolve();
}).then(function() {
  console.log('G');
});

console.log('H');
```

`D -> A -> C -> F -> H -> B -> G -> E`

```javascript
console.log('1');

async function async1() {
  console.log('2');
  // 注意：这里有第一个 await
  await console.log('3'); 
  console.log('4');
  // 注意：这里有第二个 await
  await console.log('5');
  console.log('6');
}

async1();

console.log('7');

new Promise((resolve) => {
  console.log('8');
  resolve();
}).then(() => {
  console.log('9');
});

console.log('10');
```

`1 -> 2 -> 3 -> 7 -> 8 -> 10 -> 4 -> 5 -> 9 -> 6`

##### Could you tell me what's the difference between ISR and SSR?

- SSR(Server-side-rendering) it generates the HTML on every single request, as server processing the data so it has slower TTFB and the server load is high.
- ISR(Incremental Static Regeneration) it's a hybrid of SSG and SSR, it generates a static page at built time and self-updates in th background after a specific time. As it served from CDN so it has lower server cost,but users might see stale data for a short period until th background revalidation completes.

##### How do you handle user authentication in SSR? How do you prevent 'Cookie' issues during server-side requests?

The code of SSR is executed on server, so it doesn't has `localStorage`.And we use cookie to do the authentication, Cookies are automatically sent by the browser to the server with every HTTP request in the headers. 

##### Could you tell me what's the difference between CSR and SSR?

- CSR (Client-Side-Rendering):

  The browser executes the JS sent by the server to fetch data and render the entire page.

  Once loaded, switching pages is instant because no full-page refresh is needed, and it has poor LCP?/FCP cause loading bundle is costly.

  Thus, CSR is best for scenario  like Dashboards, Admin portals, or SaaS tools where SEO is not a priority and interactivity is complex.

- SSR (Server-Side-Rendering):

  The server fetches data and pre-renders full page on every request. The browser receives a complete document and candispaly immediately.

  It has better LCP, but the server must wait for data fetching and rendering before sending anything, so it has a TTFB bottleneck.

  So it's best for E-commerce, New sites, Landing page where SEO and FCP are critical.

##### What is SSG and how does it differ from SSR?

SSG (Static Site Generation) is the process of generating the full HTML at build time.

- So SSG is rendered once at buid time while SSR is rendered at every request time
- SSG hands files by CDN so it has fast TTFB while SSR is more slower because the server must work first
- SSG doesn't need server running which no server cost
- SSG fetch data only once so the data freshness is stale but SSR is always real-time updated

So if the content is the same for every user and doesn't change always, it's better to choose SSG. And if the content is unique to the users or must be updated instantly, it's more better to use SSR.

##### Why hydration is expensive?

1. When the browser receives the server-rendered HTML, it display it immediately.However, React still has to re-run the entire application's logic in the browser.
2. To  hydrate successfully, the client needs the exact same data the server used.So we're essentially sending the data twice which increases the total byte size sent over the write.
3. React is extremely paranoid during hydration.It checks every single attribute and text node to ensure the Server HTML matches the Client output.

To sum up, hydration is expensive primarily because it's a CPU-intensive task that blocks the main thread. It requires the browser to recreate the component tree and reconcile it with the existing DOM.

#####  Can you explain the concept of streaming SSR and how it improves user experience?

In the traditional SSR model. the server follows a ''all-or-nothing'' cycle: fetch data -> render the page -> send the page to browser

If one API is slower and takes more time to on call, the entire page will be delayed event if the rest of page was ready. And streaming SSR is designed to breaks the cycle.

With streaming SSR, server breaks the HTML into chunks.Once a component's data is ready, the server sends the piece of HTML over the same HTTP connection

With these steps, streaming SSR brings lower TTFB, since the server doesn't wait for data to start sending the response, the browser receives the first byte almost instantly.

As users can see the layouts and navigation immediately, this progressive rending giving  the user a good visual confirmation.

Also, the hydration can de started once the parts of the page arrived, it improved TTI.

##### Can you explain how a browser renders a web page?

When the browser receives the HTML, it follows the rendering path:

1. First, it parses the HTML to build the DOM tree and CSS to CSSOM tree
2. It combines these two into the Render tree.
3. The browser calculates the exact position and size of each node.It's the geometry calculation step.
4. The browser fills in pixels.
5. Finally, the browser separates elements into layers and composites them on the screen.

##### Why is CSS considered a render blocking resource?

CSS is render-blocking because the browser refuses to paint any content until it has built the CSSOM. So if there is a CSS file still downloading above the `script`, the browser  pauses JavaScript execution until that  CSS is finished.

Try to fix the problem, it's recommend to use  inline style in `head` or use media queries with `media="print"`

##### What is the difference between Repaint and Reflow? Which one costs more?

Reflow happens when we change the layout of the page-like changing `width`, `height` or the position of an element. The browser has to recalculate the geometry of that element and often its neighbors.

Repaint happens when we change the lock of an element without changing its size or position. The browser skips the layout step and jumps straight to painting pixels.

Reflow always triggers a repaint while repaint doesn't trigger a reflow, so reflow costs more, it has more expensive operation.

To avoid both, it's better to use properties that trigger composite only, like `transform` and `opcaity`.

##### What is forced synchronous layout? And why is it bad for performance?

Forced synchronous layout occurs when JavaScript reads a geometric property immediately after writing a style change, forcing the browser to calculate the layout instantly.

- It defrosts the browser's lazy batching system.
- If the layout calculations are heat, it locks up the main thread.
- If the calculations take too long, the browser missed the fream deadline, causing visible stuttering.

##### Explain the concept of Composite in browser rendering, how does it help with performance?

Composite is the final step in the rendering pipeline.After the browser has calculated the layout and painted all elements, it separates certain elements into Layers.

- Compositing makes browser skip the layout and paint stages entirely.
- The 'compositor Thread' is independent with the main thread, so the block of the main thread won't affect the animations running.

##### What is the difference between DOMContentLoaded and load events?

- `DOMContentLoaded` triggered on the documnet object and after the browser finished parsing the HTML and the DOM nodes
- `load` triggered on window object after the entire page has been fully loaded

For initializing analytics or UI logic, it's good to use `DOMContentLoaded`. waiting for `load` is bad for user experience.

##### Why do we need to upgrade from Http/1.1 to Http/2?

Here are the 3 main reasons for the upgrade:

1. Http/1.1 processes requests one by one. If one large image takes a long time to load, all the other small files behind it have to wait.It blocks line. The head-of-line blocking
2. Http/1.1 is a text protocol. It's inefficient for browser to parse.Also every request sends the same massive Headers repeatedly 
3. As browsers limit to 6 connections per domain.

##### What is the core difference in Http/2 compares to Http/1.1?

The core difference lies in the format of the data being transmitted.

Http/1.1 sends data as text format while Http/2 sends data as binary frames.

Http/2 turns text into a stream of 0s and 1s before sending it. It slices the message into tiny, manageable pieces called Frames.Computers parse binary data incredibly fast.More importantly, as the data is chopped into frames they can be interleaved on the wire, which enables Multiplexing.

##### We know HTTP/2 introduced multiplexing to solve application-level blocking, so why did HTTP/3 move to QUIC  over UDP? 

Since TCP can't be changed, so HTTP/2 still has the Head-of-Line blocking.So HTTP/3 no longer uses TCP, but is based on UDP.

However, UDP protocol itself is unreliable so there is a new protocol called QUIC on top of UDP.

And QUIC re-implements all the advantages of TCP but built on top of UDP.

##### What was still “broken” in HTTP/2?

The biggest problem with HTTP/2 is **TCP Head-of-Line Blocking**. Since it uses a single TCP connection, if one packet is lost, the operating system pauses the entire connection to wait for it. All streams get blocked.
##### How does HTTP/3 improve the connection setup time?

HTTP/3 is faster because it combines the transport handshake (TCP) and the security handshake (TLS) into a single step.

In Http/2 there are two step verification: TCP: 1 round trip, TLS: 1-2 round trips, which means we have to wait 2 or 3 round trips before sending real data.

And Http/3 only need one step verification cause QUIC has encryption built-in , it sends connection request and the encryption at the exact time.

##### What is 0-RTT?

0-RTT stands for Zero Round Trip Time, which means the browser can skip the handshake. It sends real data inside the first packet it sends to the server.

#####  Are there any downsides to using UDP at HTTP/3?

Yes, even though HTTP/3 is faster, it comes with high cost.

1. The biggest downside is **CPU Overhead**. Because QUIC runs in user-space and not kernel-space, it is not as optimized as TCP yet, requiring more server power.
2. Many firewalls block UDP traffic because they think it is an attack or spam. This is called **UDP throttling** or **Middlebox interference**
3. Observability is harder. Because QUIC encrypts almost everything, standard network tools often can't see the details of the traffic, making debugging difficult.

##### What's your go to method for debugging a weird UI bug that only happens on mobile?

My go-to method is remote debugging via USB.

Firstly, I would use the device toolbar in chorome to simulate the screen size.

And if the bug cannot be fixed bu this way, we can connect the mobile phone to  computer via the USB cable, if it is Android phone, and open `chrome://inspect`on the desktop browser.So that we can use the full power of desktop DevTool of the real device and know what is exactly happened.

And if we cannot connect vias USB, I choose to inject a vConsole tool into the code to open a mini-version of DevTool inside the app.

##### How do you trace where a specific network request is coming from in the code?

I go to the network tab and look at the column "initiator".

First, find the request in the list.

Hover the mouse over the filename in the initiator column.

So you can see the call stack in the popup.

And click the link, so you can see the line of the code currently executed in source panel.

##### What is black box script?

It's also called "ignore list".And it is a feature in devTools that tells the debugger to skip certain files.

Without this feature, if we click 'skip into', the debugger might jump into thousands of lines code, which is confusing and a waste of time.

##### How do you inspect an element that disappears the moment you click away like a tool tip or a drop down?

So I usually consider the "force state" way,

If the element is controlled by CSS, I force the browser to keep it active.

If the element is controlled by Js, I use the pause shortcut.

Open the sources panel, trigger the tooltip with mouse, and immediately press F8, pauses script exection and freezes the entire DOM.

##### How do you check if your Web app is leaking memory?

First, I do a quick check using the Performance Monitor. It provides a real-time view of memory usage.

If I see the JS Heap size climbing constantly without dropping, there must be a problem.

And I will go to the Memory tab and take heap snapshots.Compare the state 'before' and 'after' a user interaction.

##### How do you debug a function that's been called way too many times, like on Scroll?
For this excessive event firing, I try `console.log()` within the event, if it is helpful. 

I will use the performance tab, use record feature, analyze the main thread timeline.So if there is a block of yellow or purple bars in the board, it means the function is firing too often.
Then I click one of the bars to see exactly which function is consuming the CPU time.

##### Can you explain the 'Stale Closure' problem in React Hooks? How is it different from how Class components handle state?

A stale closure occurs when a function (e.g., inside useEffect) captures state variables from a specific render cycle. If the dependency array is empty ([]), the function remains bound to those "frozen" initial values, even after the component re-renders with new state.

To solve this:

1. We can add the variable to the dependency array.This forces the effect to re-run and recapture the new scope.
2. For `useState` we can use the functional updates form.This bypasses the closure problem entirely because it asks React for the latest state value at the time of execution, rather than relying on the variable in the local scope.

##### Why use hooks? Is class such bad?

The main reason to use hooks is reusing stateful logic.With classes, we reied on patterns like HOCs or render props, which usually  led to 'wrapper hell'. Hooks allow us to extract and share logic cleanly via custom hooks without changing the component hierarchy.

In classes, related logic is split apart by lifecycle methods, while unrelated logic is often mixed together.

To sum up, hooks allow us to reuse logic easily, organsize code by feature rather than lifecycle, and avoid the complexity of the `this` keyword.

##### How does useEffect replace multiple lifeCycle methods?

It replaces by tranverting the mindset from 'lefecycle moments' to 'synchronyization'.

If we passes an empty array it runs only once, like `componentDidMount` 

If we add variables to the dependency array, it runs whatever that data changes, replacing `componentDidUpdate`

By returning a function from the effect, we define cleanup logic, which replaces `componentWillUnmount`

##### What is the main benefit of custom hooks?

The main benfit is exacting bussiness logic out of the UI. Our component only cares about rendering. The custom hook handles the logic.

The custom hooks can share stateful logic, not state itself. Different components have their own independent state. Allows us to achieve a clear separation of concerns.

Custom hooks don't add unnecessary nesting to the DOM tree, they let us compose behaviors nicely and make the code much more readable and testable.

##### Why do we need useCallback? When not to use it?

We need `useCallback` to maintain referential equalality to prevent unnecessary re-renders in child component.

In React compoent, every time the component re-renders, all functions inside it are re-created.

`useCallback`solves this by giving us the same memory address across multiple renders.

Don't wrap every function in `useCallback`, only use if we are passing the function to a `React.memo` child or using it in a dependency array.

##### What is the rules of hooks?

1. Only call hooks at the top level of the React function, and cannot call hooks inside loops, conditions, or nested functions.
2. Only call hooks from React function components or custom hooks.

##### How do class components handle errors differently than hooks?

Classes have special methods called Error Boundaries: `componentDidCatch` and `getDerivedStateFromError`.If a child component crashed, the class component catches the errors and shows a fallback UI instead of crashing the whole browser tab.

And there is no hook equivalent for error boudaries.So we need at least one class component at the top of level to handle these errors safely.

##### When should I still choose a class component over a function component?

1. The feature that hooks cannot do yet is error boundaries, so the scenario we need to catch errors I will choose class component.
2. If I'm working on a massive, complex legacy component that is already written as a class, I will generally keep it as a class.

##### In your daily work, what is the most common scenario where you intentionally use Closures?

In my daily work, the most common scenario is **debounding** or **throttling**.

And in React, `useState` and `useCallback` are essentially built on closures, and when I forgot to add adeptdency to the array, I get a 'stale closure'.

As JavaScript doesn't have private variables in classes, so I use closures to emulate private state.

##### Can you give an example of an  accidental global variable causing a memory leak?

In JavaScript if a variable is assigned without `let` `const` `var`, the engine autumatically creates it as a property of the global object, GC cannot clean it up, thus cause a memory leak.

##### Why do we need to clear intervals or event listeners in single page applications?

If we don't clear an interval or a global event listener, they keep the references to the component's variables. And the garbage collector won't clean them up because of the references and that leads to detached DOM trees.

##### How does Javascript know when to free up memory?

JavaScript determines when to free memory based on Reachability.

It starts from the Root, like the `window` object or the exection stack and traverses down. If an object is not reachable from the roots, it is considered garbage.

And when we create a new object and the memory space is full, the engine triggers a cleanup to clear out the dead objects and make room for the new ones.

##### So what is a detached dom node and why is it bad?

A detached DOM is an HTML element that has been removed from the document, but is still being kept alive in the memory.

It is bad bacause if I still keep a reference to a deleted element, the Garbage collector cannot free the element.

##### How do you check for memory leaks in chrome devtools?

1. First,I will use **Performance** tab to see if there is a memory leak. If the values go up, GC runs, but values never return to the original baseline, it shows there must have memory leak.
2. Then open **Memory** tab, take a snapshot for the baseline and perform the user actions multiple times, force garbage collector and take the final snapshot.
3. Switch to the **Comparison View**, check if there is a detached elements.

For this excessive event firing, I try `console.log()` within the event, if it is not helpful. 

I will use the performance tab, use 'record and reload' feature, analyze the main thread timeline.So if there is a block of yellow or purple bars in the board, it means the function is firing too often.
Then I click one of the bars to see exactly which function is consuming the CPU time.

##### What happens if two closures share the same scope? 

In JavaScript, a closure is a function bundled with a link to its lexical environment. So if there are two fucntions inside the same parent function call, they both point to the same lexical environment instance.

So if the one closure modified a variable, the other closure sees the change immediately.Because they share the live data.

##### What's the difference between target and currentTarget?

`event.target`: The element that actually triggered the event. It won't change during the bubbling parse.

`event.currentTarget`: The element that is listening for the event. It changes during the bubbling parse.

##### What's the reason to use event delegation than event listener?

1. event delegation has better performance, without delegation we need to add multiple event listener for every object. With delegation we can only add one single event listener to the parent node.
2. Delegation is better in dynamic content, with delegation, content changes(add, delete) works automatically to the children.We don't need to do any extra setup for new elements.

##### Could you explain the key differences between how Vue 3 (Composition API) and React (Hooks) handle component reactivity and side effects?
The fundamental difference lies in the Mental Model of how the frameworks handle updates.
React Hooks rely on a deterministic call order. Internally, hooks are stored in a linked list; breaking this order (via conditionals or loops) causes a state mismatch.

Vue Composition API uses a Proxy-based reactivity system. The setup() function runs only once during initialization to subscribe to dependencies, making it more flexible and immune to the "rules of hooks" regarding execution order.
