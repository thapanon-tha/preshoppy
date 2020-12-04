function upload(file, path) {
  return new Promise(
    (res, rej) => {
      file.mv(
        path, 
        (err) => {
          if (err) 
            return rej(err);
          res();
        }
      );
    }
  );
}

module.exports = {
  upload,
  uploadPath: `./data/upload`
};
