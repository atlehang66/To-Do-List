var http = require('http');  
const express = require('express');
const app = new express();
app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'path_to_your_views_folder'));
app.use(express.static('public'));
app.listen(3000, ()=>{
    console.log("Server running at http://localhost:3000/");
});

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/test', (req, res) => {
    res.render('test');
});

