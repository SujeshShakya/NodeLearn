const express = require('express');
const file = require('fs');
const file1 = require('fs').promises;

const app = express();

app.get('/', (request, response)=>{
    file.readFile('./home.html','utf8',(err, html)=>{
        if(err){
            response.status(500).send('not available at the moment')
        }
        response.status(200).send(html);
    })
})

app.get('/', async (request, response)=>{
 response.send(await file1.readFile('./hello.txt','utf8'));
})
app.listen(process.env.PORT || 3000, () => console.log("app is available"))
