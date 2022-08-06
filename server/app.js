
const express = require('express');
const app = express();
let port = 3001;

app.use(require('./routes/authentication.js'))

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})