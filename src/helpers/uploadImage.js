import randToken from "rand-token";
import fs from "fs";
import path from "path";

function uploadImage(fileObjArray, pathFolder, fieldname) {
  let fileName = [];
  for (let index = 0, len = fileObjArray.length; index < len; ++index) {
    if (fileObjArray[index].fieldname.includes(fieldname)) {
      let documentFile =
        randToken.uid(16) + path.extname(fileObjArray[index].originalname);
      let uploadPath = "./public/" + pathFolder + "/" + documentFile;
      let outStream = fs.createWriteStream(uploadPath);
      outStream.write(fileObjArray[index].buffer);
      outStream.end();
      fileName.push(`/${pathFolder}/${documentFile}`);
    }
  }
  return fileName;
}
export { uploadImage };
