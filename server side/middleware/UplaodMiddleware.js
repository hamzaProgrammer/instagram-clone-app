const multer = require('multer');
const GridfsStorage = require('multer-gridfs-storage');

const storage = new GridfsStorage({
    url: process.env.DB,
    options: { newUrlParser: true, useUnifiedTopology: true,},
    file: (req,res) => {
        const match = ["image/png" , "image/jpeg"];

        if(match.indexOf(file.mimetype) ===  -1 ){
            const filename = `${Date.now()}-any-name-${file-originalname}`;
            return filename;
        }

        return{
            bucketName : "Photos",
            filename: `${Date.now()}-any-name-${file-originalname}`
        }
    }
})


module.exports = multer({storage})