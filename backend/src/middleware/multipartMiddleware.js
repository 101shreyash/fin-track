import multer from "multer";

const upload = multer({ dest: "receipts/" });


export default upload;
