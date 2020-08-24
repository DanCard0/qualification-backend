const express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send({ message: 'Success' });
});

module.exports = router;