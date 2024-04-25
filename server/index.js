const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const mongoose = require("mongoose");
const DataModel = require("./models/datamodel.model");
const path = require('path');
app.use(cors());
app.use(bodyParser.json());

const port = 1337;
const dbName = "ipt";

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

mongoose
    .connect("mongodb://localhost:27017/" + dbName)
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.error("Database connection error", err));

//add
app.post("/add", async (req, res) => {
    const incomingData = req.body;

    try {
        const dataObject = new DataModel(incomingData);
        await dataObject.save();
        res.json({ success: true, message: "Data added successfully!" });
    } catch (error) {
        console.error("Error adding data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//read or view
app.get("/view", async (req, res) => {
    try {
        const gotDataList = await DataModel.find();
        res.json(gotDataList);
    } catch (error) {
        console.error("Error getting data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//update
app.post("/update", async (req, res) => {
    const incomingData = req.body;

    try {
        const dataObject = await DataModel.findOne({ email: incomingData.email });
        if (!dataObject) {
            res.json({ success: false, message: "Data not found" });
        } else {
            Object.assign(dataObject, incomingData);
            await dataObject.save();
            res.json({ success: true, message: "Data updated successfully!" });
        }
    } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//delete
app.delete("/delete", async (req, res) => {
    const incomingData = req.body;

    try {
        const dataObject = await DataModel.findOne({ email: incomingData.email });
        if (!dataObject) {
            res.json({ success: false, message: "Data not found" });
        } else {
            await dataObject.remove();
            res.json({ success: true, message: "Data deleted successfully!" });
        }
    } catch (error) {
        console.error("Error deleting data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//sign-in
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const dataObject = await DataModel.findOne({ username });

        if (!dataObject) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        if (dataObject.password !== password) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // User is authenticated
        res.json({ success: true, message: 'Logged in successfully!' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//sign-up
app.post("/signup", async (req, res) => {
    const incomingData = req.body;

    try {
        const dataObject = new DataModel(incomingData);
        await dataObject.save();
        res.json({ success: true, message: "Signed up successfully!" });
    } catch (error) {
        console.error("Error signing up:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});