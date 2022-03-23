const express = require('express');
const moment = require("moment-timezone");
const router = express.Router();
const firebase = require("firebase")

const admin = require('../../admin');

router.get('/', async (req, res, next) => {
    try {

        return res.status(200).json({time: moment().format(), events: [], userData: {}});

    } catch (e) {
        return res.status(404).json(e.toString());
    }
});

router.post('/', async (req, res, next) => {
    try {
        const db = firebase.firestore()
        db.useEmulator("localhost:5005")

        const res = await db.collection("users").doc("test").set({
            name: "Duong",
            age: 18,
            createdAt: new Date()
        })

        return res.status(200).json(res);

    } catch (e) {
        return res.status(404).json(e.toString());
    }
});

module.exports = router;
