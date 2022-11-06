const fs = require('fs');
const fsPromise = require('fs/promises');
const path = require('node:path');
const { allowedNodeEnvironmentFlags } = require('process');

const folderDist = path.join(__dirname, 'project-dist');

function createFolder() {
    fs.mkdir(folderDist, (err) => {
        if (err) {
            if (!err.code == 'EEXIST') throw err;
        }
    });
}

async function changeHTML() {
    const fileHTML = path.join(__dirname, 'template.html');
    const folderWithHTML = path.join(__dirname, 'components');
    const newFileHTML = path.join(folderDist, 'index.html');

    let template = (await fsPromise.readFile(fileHTML)).toString();
    const componentsArray = await fsPromise.readdir(folderWithHTML);

    for (let i = 0; i < componentsArray.length; i++) {
        let innerHTML = await fsPromise.readFile(path.join(folderWithHTML, path.basename(componentsArray[i])));
        template = template.replace(`{{${path.basename(componentsArray[i], path.extname(componentsArray[i]))}}}`, innerHTML.toString());
    }

    await fsPromise.writeFile(newFileHTML, template);
}

async function mergeCSS() {
    const folderWithCSS = path.join(__dirname, 'styles');
    const finalCSS = path.join(folderDist, 'style.css');
    let filesCSS = await fsPromise.readdir(folderWithCSS);
    let partsCSS = [];

    for (let i = 0; i < filesCSS.length; i++) {
        let stat = await fsPromise.stat(path.join(folderWithCSS, path.basename(filesCSS[i])));
        if (!stat.isDirectory() && path.extname(filesCSS[i]) == '.css') {partsCSS.push(filesCSS[i])}
    }

    for (let i = 0; i < partsCSS.length; i++) {
        let css = await fsPromise.readFile(path.join(folderWithCSS, partsCSS[i]));
        await fsPromise.appendFile(finalCSS, css.toString());
    }
}

async function copyAssets() {
    const assetsFolder = path.join(__dirname, 'assets');
    const newAssetsFolder = path.join(folderDist, 'assets');

    fs.mkdir(newAssetsFolder, (err) => {
        if (err) {
            if (!err.code == 'EEXIST') throw err;
        }
    });

    let assetsFoldersList = await fsPromise.readdir(assetsFolder);

    for (let i = 0; i < assetsFoldersList.length; i++) {
        let pathNew = path.join(newAssetsFolder, path.basename(assetsFoldersList[i]));

        fs.mkdir(pathNew, (err) => {
            if (err) {
                if (!err.code == 'EEXIST') throw err;
            }
        });

        let filesAssets = await fsPromise.readdir(path.join(assetsFolder, assetsFoldersList[i]));

        for (let j = 0; j < filesAssets.length; j++) {
            await fsPromise.copyFile(path.join(assetsFolder, assetsFoldersList[i], filesAssets[j]), path.join(pathNew, path.basename(filesAssets[j])));
        }
    }
}

createFolder();
changeHTML();
mergeCSS();
copyAssets();