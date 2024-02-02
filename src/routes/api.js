const express = require("express");
const { seeIamges, uploadImage, downloadImage, deleteImage } = require("../controllers/upImage");
const router = express.Router();

router.get("/", seeIamges);
router.post("/upImg", uploadImage);
router.get("/download/:fileName", downloadImage);
router.get("/delete/:fileName", deleteImage);


module.exports = router;
