# Overview

Welcome to the backend!

The **backend** refers to code that does not run on the user's computer but instead on the **server**. 

We will be learning about servers and databases, the two main parts of a backend. 

---

## What is a server?

- Computer program and/or device 
- Provides a service to another computer program and its user
  - The one receiving the service is the client

---

## Server Hardware

- Ordinary computer
  - *Usually* in a different location
  - Can be the same computer as the client technically
- Stores programs that can do a variety of things
- Store files and data needed to serve websites
  - JavaScript files
  - HTML
  - CSS stylesheets
  - Images

---

## Server Software

- Understands URLs 
- Listens for HTTP requests
- Sends responses to those requests
- Often used to conduct behaviors that are not safe to perform on the client-side. 

---

## Requests

- Different requests are sent 
  - _from the client_ 
  - _to the server_
  - along different **routes**
    - "Route" on the backend refers to a URL, just like on the frontend.
  - carrying information from the client if needed
- Requests follow HTTP:
  - POST - **C**reate  
  - GET - **R**ead 
  - PUT - **U**pdate 
  - DELETE - **D**elete

---

# Responses

Servers **respond** to clients

- while following specific rules, determined by the engineer.
- to send information back to the *client*
- after carrying out actions warranted by the request 
  - e.g. updating a database
- with a status code
  - 200 is `OK`
  - 404 is `Not Found`
  - [and more...](https://http.cat/)

---


# Node vs JavaScript Review

* Global Objects
  * `global` v. `browser` or `window`
* Import/export methods
  * `require` v. `import`
* Different access to APIs
  * e.g. fetch - browser only
  * e.g. fs - node only

---

# Routing

*routing* in web apps is essentially a set of rules to decide...

  * given this request
  * what code do we run?
  
the "code we run" is also called an *endpoint* or a *route* or a *script* or a *handler* or any of a number of different terms. It is generally a callback function with access to a "request" and a "response" object.

The "code we run" doesn't have to be complicated. It could be as simple as sending a file.

---

# Routing Cont.

Many web app server frameworks have complicated systems for routing, but that complexity is not essential.

Routing can be a simple series of `if..else` statements, or a [`switch` statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) 

and most of the fancy framework code is simply to build up a list of matching rules which the server then walks through in first-to-last order.

---

# Routing Cont.

Libraries like Express give you more than the *implementation* of features like routing and parameter passing.

They also give you an *interface* that will make **your** code easier to read.

As well as a shared context of documentation and tutorials so other coders don't have as much to learn before understanding your code.

---

# Express Routing

* supports handling all HTTP methods with the pattern `app.method(path, handler)`

* whenever an incoming request of the given *method* (POST, GET, DELETE...) matches the *path* parameter, Express will invoke the *handler* callback function

* That *handler* has access to the `request` and `response`, and the methods/properties they contain!

---

# Express Routing Example

An Express route set up to listen for a `get` request on the home page, that sends back the text "Hello World!" would look like this:

```js
app.get('/', (request, response) => response.send('Hello World!'))
```

`get` requests are by far the most common type of request you'll be dealing with since it is the method that *requests* new data from the server

`get` requests can be triggered many different ways, such as by entering a URL in the browser, using `fetch` in your client side code, or redirecting to a new router on the server.

---

# Express Routing Breakdown

| code | explanation |
|---|---|
| `app` | my application, the initialized Express app|
| `.get` | when the client sends a `GET` request |
| `(request, response) =>` | will call this *handler* function with a *request* object and a *response* object |
| `response.send` | send a response |
| `('Hello, World')` | with this string as its body | 

---

# Parameters in Express

The special character `:` means "this is a [path parameter](./parameters#path_parameters)"

Example:

|  |  |
|---|---|
| Path:| `/hello/Gandalf` | 
| Route:| `/hello/:friend` | 
| Params:| `{friend: 'Gandalf'}` | 

Express will grab the *value* from the path itself, and assign it to `request.params` for you to use later.

---

# Route Matching 

Express will try to match routes 

- *in the order they are defined* in your JS file.
- Once it finds the matching route 
  - runs the attached request/response callback function
  - and stops looking. 
  - Any other route handlers that could also match don't run

---

# Route Matching Cont. 
```javascript
// POST /login gets urlencoded bodies
app.post('/login', function (req, res) {
  res.send('welcome, ' + req.body.username)
})

// POST /api/users gets JSON bodies
app.post('/api/users',  function (req, res) {
  // create user in req.body
  res.status(200)
})
```


<!--
---

# Express Middleware

* [`express.urlencoded`](https://expressjs.com/en/4x/api.html#express.urlencoded) parses incoming requests with URL-encoded payloads.
* [`express.json`](https://expressjs.com/en/4x/api.html#express.json) parses incoming requests with JSON payloads.
* [`express.static`](http://expressjs.com/en/4x/api.html#express.static) serves static files, and sets restrictions on client-side access
* Tons of 3rd-party and error-handling options
* And the ability to create, and use your own middleware!


 # Middleware Example

Example (from [the express guide](http://expressjs.com/en/resources/middleware/body-parser.html)):

```javascript
// POST /login gets urlencoded bodies
app.post('/login', express.urlencoded(), function (req, res) {
  res.send('welcome, ' + req.body.username)
})

// POST /api/users gets JSON bodies
app.post('/api/users', express.json(), function (req, res) {
  // create user in req.body
})
```

---

# Write your own middleware!

Remember how we said you can create your own middleware? Let's give it a shot!

When doing so, that function will have access to the `request` and `response` objects, AND the callback function `next` that simply tells it to carry on with the route's execution.

```javascript
function logTime(req, res, next) {
    let date = new Date()
    console.log(date.toLocaleDateString()) 
    next()
}

app.get('/route/', logTime, (req,res)=>{
  res.send("All done!")
})
``` -->

# Serving Files

* **Serving** a file refers to sending a file from the backend to the user.
* **Static**
    * Files saved on the server computer that do not change in real time.
* **Dynamic**
  * Files created on the fly for every request.

---

# Serving Static Files

In earlier lessons, you may have used the `live-server` VSCode extension to serve your projects before we began learning React.

Live-server is an example of a static file server built into Node.

This tool is useful for local development but not great for production deployments. We don't have very much control over it.

---

# Creating a Static File Server using Express

* Express comes with its own static file server

```js
let staticServer = express.static('.')
app.use( staticServer )
```

---

# Headers: Content-Type  

* files usually tell you what file type they are
    * e.g. .html, .js, .css
* URLs often do not do this
    * `https://developer.mozilla.org/en-US/docs/Web/JavaScript` is a route that serves an HTML page. Notice how it doesn't have `.html` at the end.
* Web servers must read the file type extension and use the `Content-Type` header on the request to tell the client what format the file is in
    * `text/html` means HTML
    * `application/javascript` means JavaScript
    * `text/css` means CSS Stylesheet
    * ...these are called *MIME Types* (after the Multipurpose Internet Mail Extensions specification)

---

# Headers: Dev Tools

![headers](https://res.cloudinary.com/btvca/image/upload/v1626093503/content-type_zimyop.png)
