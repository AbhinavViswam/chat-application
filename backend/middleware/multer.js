import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './upload')
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname+ Date.now() + path.extname(file.originalname));
      },
  })
  
  const upload = multer({ storage: storage })
  export default upload