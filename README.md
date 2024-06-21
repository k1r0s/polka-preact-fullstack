# Backend (Fullstack) Interview for Paerson

This is the solution proposed for the Paerson's Backend position.

It consist on a simple Nodejs backend app and a Preact frontend app.

I made a lot of unconventional desitions but dancing on the edge is how I like to showcase my expertise and knowledge.

### DISCLAIMER
This is not by any means a prod ready app. 

- No authentication
- No model integrity (the frontend may post a request body, and later a different one, there are no checks)
- No check for errors (the API is not in control)

However it goes without saying that the application is very easy to extend and escalate.

### Running

>⚠️ It requires you to have docker and compose plugin

The compose file turns on 4 services, an nginx proxy, a redis database, the frontend app and the backend.

Place yourself in the root directory and do: `docker compose up -d --build`

>⚠️ Filling the database using the script requires you to have jq installed
After the services are up you may load some data into the database so you can quickly see all the features running: `sh fill_database.sh`

### Running tests (backend only)

Just place yourself on the backend directory and do: `npm run test`
>⚠️ Running anything in your local machine besides docker requires you to install npm dependencies

### Description / Behavior

The app has three main routes: Home, List, New

List loads the courses present in the database
New presents a form so you can create new courses
From the list, you can edit a course, edit its students or remove it
From the edit screen you can go to the students screen as well
From the students screen you can remove, add or filter students

### Technology choices (Backend)
The Backend application uses [polka](https://www.npmjs.com/package/polka) which is basically a faster express.js library.

src/index.js just bootstraps ENV variables to set up routes and tie middlewares with a database wrapper.

src/redis.js its just a database wrapper that exposes CURD methods. All database interactions are done by this file and exposed through that CRUD interface.

For testing I choosed mocha as a test runner and sinon for stubs and spies. Nodejs assert library was enough for basic tests. I've included a file `a_lot_of_samples` to showcase many more scenarios

I did unit testing for the redis wrapper. But I've done some e2e test for the whole application. Not every frontend behavior is tested in e2e, but it is easy to extend.

```
back/
├── Dockerfile
├── package.json
├── package-lock.json
├── src
│   ├── index.js
│   └── redis.js
└── test
    ├── a_lot_of_samples.js.readme
    ├── e2e
    ├── run.sh
    └── unit

```

### Technology choices (Frontend)
For this test I adapted a POC (with many cool ideas) that I've used previously. This application uses [preact](https://www.npmjs.com/package/preact) which is basically a faster React library.

It uses [vite](https://www.npmjs.com/package/vite) for dev powerhouse, building and bundling everything.

src/app.js routes the pages and sets the basic layout.

src/pages/ contains all components that load upon location changes.
src/components/ contains all other components that either solve a particular problem or encapsulate some behavior.

I also have experience testing FE applications but it is out of scope here.

```
front/
├── Dockerfile
├── index.html
├── package.json
├── package-lock.json
├── src
│   ├── app.jsx
│   ├── assets
│   ├── components
│   ├── pages
│   ├── stubs.js
│   └── utils
└── vite.config.js

```
