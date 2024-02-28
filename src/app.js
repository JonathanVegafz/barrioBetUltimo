const express = require('express');
const { json } = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const route = require('./routes');

const app = express();
const port = 3010;
app.use(json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
  
app.use(route);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
