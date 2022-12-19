
const express = require('express');
const app = express();
let port = 3001;

app.use(require('./routes/authentication.js'));
app.use(require('./routes/createLists'));
app.use(require('./routes/addCards'));

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})