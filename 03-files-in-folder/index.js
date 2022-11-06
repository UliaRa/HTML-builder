function getFIles() {
    const fs = require('fs');
    const path = require('node:path');

    const pathToFolder = path.join(__dirname, 'secret-folder');

    fs.readdir(pathToFolder, (err, files) => {
        if (err) throw err;
        else {
            for (let i = 0; i < files.length; i++) {
                let ext = path.extname(files[i]);
                let name = path.basename(files[i], ext);
                ext = ext.toString().slice(1);
                let sizeOfFile;
                fs.stat(path.join(__dirname, 'secret-folder', files[i]), (err, stats) => {
                    if (err) {
                        console.log(`${name} - ${ext} - ${undefined}`);
                        throw err;
                    }
                    else {
                        sizeOfFile = stats.size;
                        console.log(`${name} - ${ext} - ${sizeOfFile}`);
                    }
                })
            }
        }
    });
}

getFIles();