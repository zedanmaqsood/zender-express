const express = require('express');

const controller = require('../controllers/main.controller');

const router = express.Router();

router.get("/", controller.getIndex); // Serve the home path
router.get("/download/:path(*)", controller.getDownloadFile); // Serve file download
router.get("/:dir(*)", controller.getDir); // Serve directory listing

module.exports = router;