const express =  require('express');
const app = express();
const path = require('path');

app.use(express.static('.'));
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')));
app.use('/gsap/', express.static(path.join(__dirname, 'node_modules/gsap')));
app.use('/examples/', express.static(path.join(__dirname, 'node_modules/three/examples')));

app.listen(8888, ()=>{
    console.log('visit http://localhost:8888/');
});