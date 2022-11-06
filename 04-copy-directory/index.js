function copyDir() {
    const fs = require('fs');
    const path = require('node:path');

    const pathToFirstFolder = path.join(__dirname, 'files');
    const pathToNewFolder = path.join(__dirname, 'files-copy');

    fs.mkdir(pathToNewFolder, (err) => {
        if (err) {
            if (!err.code == 'EEXIST') throw err;
        }
    });

    fs.readdir(pathToFirstFolder, (err, files) => {
        if (err) throw err;
        else {
            files.forEach(file =>
                fs.copyFile(path.join(pathToFirstFolder, path.basename(file)), path.join(pathToNewFolder, path.basename(file)), (err) => {
                  if (err) throw err;
                }));            
        }
    });
}

copyDir();