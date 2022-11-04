function readTxt() {
    const fs = require('fs');
    const path = require('node:path');

    const pathToFile = path.join(__dirname, 'text.txt');

    let stream = fs.createReadStream(pathToFile);
    stream.on('data', function (chunk) {
        console.log(chunk.toString());
    });
}

readTxt();