const fs = require("fs");
const path = require("path");
const multer = require("multer");

const basePath = path.join(__dirname, "../images");
const metadataPath = path.join(__dirname, "../../metadata.json");

if (!fs.existsSync(metadataPath)) {
  fs.writeFileSync(metadataPath, "{}");
}

let files = fs.readdirSync(basePath);
let metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: (req, file, cb) => {
    const uploadTime = new Date().toLocaleString();
    metadata[file.originalname] = uploadTime;
    fs.writeFileSync(metadataPath, JSON.stringify(metadata));
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("myFile");

exports.seeIamges = (req, res) => {
  files = fs.readdirSync(basePath);
  metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
  let data = [];
  for (let i = 0; i < files.length; i++) {
    const element = files[i];
    let mObj = {
      id: i,
      initialUploadTime: metadata[element],
      fileName: element,
    };
    data.push(mObj);
  }
  res.render("index", { data });
};

exports.uploadImage = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.send("File upload failed");
    }
    res.redirect("/");
  });
};
exports.downloadImage = (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "../images", fileName);
  res.download(filePath);
};
exports.deleteImage = (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "../images", fileName);
  fs.unlinkSync(filePath);
  delete metadata[fileName];
  fs.writeFileSync(metadataPath, JSON.stringify(metadata));
  res.redirect("/");
};
