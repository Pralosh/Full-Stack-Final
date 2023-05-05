const express = require('express');
const app = express();

console.log("Hello World!")

app.listen(3001, () => {
    console.log('Server at: http://localhost:3001/');
})