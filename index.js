const express = require('express');
bodyParser = require('body-parser');
const cors = require('cors');
const snBase = require('./sn_db_controller');
const temperatureBase = require('./temperature_db_controller');

const PORT = 8080;
let count = 1;

const app = express();
// app.use(bodyParser.text({type: 'text/plain', limit: '50mb'}))
app.use(express.json());
app.use(cors());



app.get('/sn', (req, res) => {
    res.send("sn request");
})

app.get('/temperature', (req, res) => {
    const result = temperatureBase.readAll(1);
    if (result) {
        res.status(200).send(JSON.stringify(result));
    } else {
        res.sendStatus(400);
    }
    
})


app.get('/temperature/current', (req, res) => {
    const result = temperatureBase.readCurrent(1);
    if (result) {
        res.status(200).send(JSON.stringify(result));
    } else {
        res.sendStatus(400);
    }
    
})

app.post('/sn', (req, res) => {
    if (!req.body) {
        console.log('no body in require');
        return res.sendStatus(400);
    }
    snBase.addSN(req.body);
    res.sendStatus(200);
})


app.post('/fileSn', (req, res) => {
    console.log('fileSn');
    if (!req.body) {
        console.log('no body in require');
        return res.sendStatus(400);
    }
    snBase.deleteTable();
    snBase.createTable('sn');
    const data = req.body;
    const arr = data.split('\n')
    let i = 0;
    arr.forEach(element => {
        i += 1;
        snBase.addSN(element);
        console.log(i);        
    });
    res.sendStatus(200);
})


app.post('/temperature', (req, res) => {
    count = count + 1;
    const rBody = req.body;
    console.log(rBody);
    if ("point" in rBody && "datatime" in rBody && "value" in rBody) {
        let {point, datatime, value} = rBody;
        if (datatime = 0) {datatime =  Date.now()}
        const resInsert = temperatureBase.add(point, datatime, value);
        console.log(resInsert);
        res.send('Inserted !');
    } else {
        res.status(400).send("Error");
    }
});

app.post('/temperature/delete', (req, res) => {
    temperatureBase.deleteTable();
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})


