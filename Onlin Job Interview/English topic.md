##### What is front end routine and why is it essential for spa?

**Front-end routing** (also known as client-side routing) is a technique used in modern web development where the browser—not the server—controls what content is displayed when a user navigates to a new URL.

A Single Page Application (SPA) literally has only one HTML file (usually `index.html`). Without front-end routing, an SPA would be stuck on one URL, or it would break standard browser behaviors.

##### What is the difference between Hash Mode and History Mode?

The main difference between hash mode and history mode is how the URL looks and how the routing is handled under the hood.

Hash mode: uses the hash symbol (#) in the url. It works by listening for the `hashChange` event. The browser naturally ignores everything after the hash when sending requests to the server, Since the hash mode urls are not sent to the server, no special server configurationtion is required.

History mode: on the other hand, uses the HTML 5 history API to create a "clean" standard url path. When routes switched, history mode calls pushState() or replaceState to add or replace a route info into the browser history stack. So users can manage navigation without reloading the page.

To sum up, history mode uses real urls paths, which has better SEO but requires server configuration support.Hash mode uses hash to simulate routing, offering better compstibility and eliminating the need for server configuration.There is no better one, choose them depends on your actual needs.

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

##### Talk about the difference between Minification and Obfuscation

Minification is mainly about performance.It removes comments, spaces, and breaks to make teh file size smaller.

Obfuscation is mainly about security and code protection.It transforms the code so that is hard for others to read or reverse-engineer.

In my workflow, I use webpack for minification.Webpack uses the TerserPlugin for minification, Vite uses esbulid,which is faster.

##### Does obfuscation affect performance?

Yes, Heavy obfuscation adds dummy code, increasing the bundle size. The browse needs more time to parse the messy AST.

As modern JS engines try to otimize code.Obfuscation makes logic unpredictable, which prevents the engine from optimizing it, causing slower execution.

So, it's recommended to heavily obfuscate the specific critical parts, not the entire UI library.

##### How Tree Shaking works?And how does it relate to magnification?

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
