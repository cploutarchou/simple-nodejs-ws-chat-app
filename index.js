let express = require('express');

const app = express();

//Open Connection
const server = app.listen(80, () => console.log('App listening on port 80'));

//HTML Files
app.use(express.static('html'));