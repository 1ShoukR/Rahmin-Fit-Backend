const express = require('express');
const router = express.Router();


router.get("/test", async (req, res) => {
    try {
        res.status(200).send("I am working")
    } catch (error) {
        res.status(400).send("Error")
    }
})





module.exports = router