
const express = require('express');
const app = express();
let port = process.env.PORT || 3001;
require("dotenv").config()
const path = require('path');

app.use(express.static(path.join(__dirname, '/public')));
app.use(require('./routes/authentication.js'));
app.use(require('./routes/createLists'));
app.use(require('./routes/addCards'));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname+"/public/index.html"));
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})