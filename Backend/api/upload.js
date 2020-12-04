function upload(path, file) {
    return new Promise((res, rej) => {
        if (!file) {
            rej("file no found");
        } else {
            console.log(file)
            file.mv(path, async function(err) {
                if (err) {
                    rej(err);
                } else {
                    res(true);
                }
            })
        }
    })
}

module.exports = upload