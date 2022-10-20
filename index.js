import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';
import express from 'express';
import cors from 'cors';
import moment from 'moment';
import modelFunction from './modelFunction.js';


const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extends: false }));
app.use(express.json());
app.use(cors());


const db = await sqlite.open({
    filename: './smart_irrigation.db',
    driver: sqlite3.Database
});

console.log('db initialized')
// await db.migrate();

// app.get('/', (request, response) => {
//  response.json({
//          status: "app running"
//      })
//  })


app.get('/api/time', async (request, response) => {
    const currentDate = moment().format('MMMM Do YYYY, h:mm:ss a')
    response.json({
        status: 'success',
        currentDate
    })
});

app.get('/api/irrigation/history', async (request, response) => {
    const irrigationHistory = await db.all('SELECT * FROM Records_table')

    response.json({
        status: 'success',
        irrigationHistory
    })
});

app.get('/api/records_table', async function (req, res) {
    const Records_table = await db.all(`select * from Records_table`);
    res.json({
        Records_table,
        //  "Message": "Am trying.."
    })
});

app.post('/api/predicted_results', async function (req, res) {
    const { irrigationStatus } = req.body
    console.log(irrigationStatus)
    res.json({
        results: irrigationStatus
    });

    // logic goes here
    const waterBeans = db.all('SELECT * FROM Irrigation_table WHERE Crop_type = Beans')
    res.json({
        results: irrigationStatus
    });

    res.json({
        results : modelFunction(cropList, irrigationStatus)
    })

});

const PORT = process.env.PORT || 6002;
app.listen(PORT, function () {
    console.log(`Irrigation API started on port ${PORT}`)
});







