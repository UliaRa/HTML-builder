function createCss() {
    const fs = require('fs');
    const path = require('node:path');

    const folderWithCss = path.join(__dirname, 'styles');
    const fileNewCss = path.join(__dirname, 'project-dist', 'bundle.css');

    fs.writeFile(fileNewCss, '', (error) => {
        if(error) throw error;
    });

    fs.readdir(folderWithCss, (err, files) => {
        if (err) throw err;
        else {
            for (let i = 0; i < files.length; i++) {
                fs.stat(path.join(folderWithCss, files[i]), (err, stats) => {
                    if (err) {
                        throw err;
                    }
                    else {
                        if (!stats.isDirectory() && path.extname(files[i]) == '.css') {
                            let stream = fs.createReadStream(path.join(folderWithCss, files[i]));
                            stream.on('data', function (chunk) {
                                fs.appendFile(fileNewCss, chunk.toString(), function(error){
                                    if(error) throw error;});
                            });                    
                        }
                    }
                })
            }
        }
    });
}

createCss();