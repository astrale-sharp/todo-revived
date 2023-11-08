# Todo App in React

This is a simple react showcase with an express server attached, that stores the task and data even if you close the page.

# Features

- Create, rename, delete, lists of tasks.
- Create delete, change, rename, move to other list, tasks.
- Tasks are sorted by date of creation.
- Optionally hide tasks that are completed.
- Have a helper to select lists.
  This is the widget on the far left, clicking on the list will bring 
  them to the left of the screen, this can be useful if you have a great number of 
  list.


# How to build and test

To build this project you need npm (>= 10) and node (>= 18).
Run the following commands

`npm install`

`npm run server-build`

`npm run server-start &`

`npm run start`

# How to deploy

After building the project, you can copy `server.js` and the `./build/` directory
wherever you want. To start your server, you can use `node server/server.js` from your server.

If you want to change the architecture, you should modify this line in `server.ts` before building:
`app.use(express.static(path.join(__dirname, '../build/')));`


