const express = require("express");
const path = require("path");
const multer = require("multer")

const PORT = process.env.PORT || 5000;
const app = express();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/assets')
    },
    filename: function (req, file, cb) {
        cb(null, "certificado.pdf")
    }
})
var upload = multer({ storage: storage })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
})

app.post("/uploadFile", upload.single('pdfFile') , async (req, res) => {
    try {
        res.send("file uploaded")
    } catch (error) {
        console.log(error)
    }
})


app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}/`) });