const express = require('express');
const router = express.Router();
const database = require('../sql/database.js');
const fs = require('fs/promises');

//!Multer
const multer = require('multer'); //?npm install multer
const path = require('path');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname); //?egyedi név: dátum - file eredeti neve
    }
});

const upload = multer({ storage });

//!Endpoints:
//?GET /api/test
router.get('/test', (request, response) => {
    response.status(200).json({
        message: 'Ez a végpont működik.'
    });
});

//?GET /api/testsql
router.get('/testsql', async (request, response) => {
    try {
        const selectall = await database.selectall();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: selectall
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

//Első feladat

let messages = [];

router.post('/sendMessage', (request, response) => {
    const {sender, message} = request.body;

    messages.push({
        sender: sender, message: message
    });
    
    console.log(messages);

    response.status(200).json({message: "Üzenet fogadva"});
})

//Második feladat

let saveData = [];

router.post('/saveData', (request,response) => {
    const { key } = request.body;

    saveData.push({
        key: key
    })

    console.log(saveData);

    response.status(200).json({message: 'Sikeres mentés'});
});

//Harmadik feladat

let savedNames = []

router.get('/names', (request,response) => {
    response.status(200).json({
        success: 'true',
        results: savedNames
    })
})

router.post('/names', (request, response) => {
    const {names} = request.body;

    savedNames.push({
        names: names
    })

    console.log(savedNames)

    response.status(200).json({message: 'SIKER'})
})

//Negyedik feladat

let votes = [{optionname: 'vote1', db: 0}, {optionname: 'vote2', db: 0}];

router.post('/vote', (request, response) => {
    const {optionname} = request.body;

    if(optionname == "vote1") {
        votes[0].db += 1

    } else if(optionname == "vote2") {
        votes[1].db += 1
    }

    console.log(votes);

    response.status(200).json({message: 'Siker'})
})

//ötös feladat

let todos = []

router.get('/todos', (request,response) => {
    response.status(200).json({
        success: 'true',
        results: todos
    })
})

router.post('/todos', (request, response) => {
    const {task} = request.body;

    savedNames.push({
        task: task
    })

    console.log(todos)

    response.status(200).json({message: 'SIKER'})
})

module.exports = router;
