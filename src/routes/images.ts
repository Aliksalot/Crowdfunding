import { Router, Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

const imagesRouter = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

imagesRouter.post("/upload", upload.single('file'), (req: Request, res: Response) => {
  if(!req.file){
    res.json({ message: "Couldn\'t upload file" });
    return;
  }

  const filesplit = req.file.path.split('/');
  res.json({ filePath: filesplit[filesplit.length - 1] });
});

imagesRouter.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  console.log('request for', id);
  
  res.sendFile(path.join(__dirname, '../../uploads', id));
})

export { imagesRouter };
