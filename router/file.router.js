const express = require("express"),
  router = express.Router();
const fs = require("fs");
const multer = require("multer");

const dealwithfiles = multer({});

router.post("/", dealwithfiles.single("file"), async (req, res) => {
  try{
    fs.writeFileSync(`root/public/${req.file.originalname}`, req.file.buffer);
    res.send(req.file.originalname)
  }catch(e){
      throw new Error(e);
  }
  
});
router.delete("/delete", async (req, res) => {
  let {url } = req.body ;
  fs.rmdir(url , { recursive: true }, (err) => {
    if (err) {
      console.error('Failed to delete directory:', err);
      res.send('Failed to delete directory:', err)
    } else {
      console.log('Directory deleted successfully');
      res.send('Directory deleted successfully')
    }
  })
  
});
router.post("/showdetails" , (req, res) =>{
  let { currentUrL } = req.body;
  fs.readdir(currentUrL, { withFileTypes: true }, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read directory' });
    }

    const contents = files.map(file => ({
      name: file.name,
      isDirectory: file.isDirectory(),
    }));

    res.json(contents);
  });
});
router.post("/uploadPackage", (req, res) => {
  let { packagename } = req.body;
  console.log(packagename);
  try {
    fs.mkdirSync(`root/public/${packagename}`);
    res.send(packagename);
  } catch (err) {
    throw new Error(err);
  }
});

router.delete("/deleteFile", (req, res) => {
  let { packagename } = req.body;
  if (!fs.existsSync(pacagename)) {
    throw new Error("the file isnt exist ");
  }

  fs.unlinkSync(`root/public/${packagename}`);

  res.send(packagename);
});
router.post("/rename", (req, res) => {
  const { oldPath, newPath } = req.body;
  
  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.error('Failed to rename directory:', err);
      res.status(500).send('Failed to rename directory');
    } else {
      console.log('Directory renamed successfully');
      res.send('Directory renamed successfully');
    }
  });
});
module.exports = router;
