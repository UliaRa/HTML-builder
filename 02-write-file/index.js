function writeFile() {
    const fs = require('fs');
    const rl = require('readline');
    const path = require('node:path');

    const pathToFile = path.join(__dirname, 'text.txt');

    rlInterface = rl.createInterface(process.stdin, process.stdout);
    console.log('Please enter the text you want to be written in file');
    fs.writeFile(pathToFile, '', (error) => {
        if(error) throw error;
    });

    rlInterface.on('line', function (line) {
        if (line == 'exit') {
            finishWriting();
        } else {
            fs.appendFile(pathToFile, line+'\r\n', function(error){
                if(error) throw error;});
        }
    });

    rlInterface.on('SIGINT', () => {
        finishWriting();
    })

    function finishWriting() {
        console.log('Thank you! Writing is over');
        rlInterface.close();
        process.exit();
    }
}

writeFile();