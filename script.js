const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
let inputFolder = "";
const extensionsToConvert = ['.jpg', '.jpeg', '.png'];

async function convertToWebP(inputFilePath){
    try{
        inputFolder = toString(document.getElementById("inputFolder").value);
        if(!inputFolder){
            alert("Por favor, introduce una carpeta de entrada.");
            return;
        }
        const image = sharp(inputFilePath);
        const imageInfo = path.parse(inputFilePath);
        const outputFilePath = path.join(imageInfo.dir, `${imageInfo.name}.webp`);

        await image.toFile(outputFilePath);
        console.log(`${inputFilePath} convertido a ${outputFilePath}`);
    } catch (err){
        console.error(`Error convirtiendo ${inputFilePath} a WebP:`, err);
    }
}

function searchFiles(directory){
    fs.readdir(directory, (err, files) => {
        if(err){
            console.error('Error leyendo el directorio:', err);
        return;
        }

        files.forEach(file => {
            const filePath = path.join(directory, file);

            fs.stat(filePath, (statErr, stat) => {
                if(statErr){
                    console.error('Error obteniendo información del archivo:', statErr);
                    return;
                }

                if(stat.isDirectory()){
                    searchFiles(filePath);
                } else {
                    const fileExtension = path.extname(file).toLowerCase();
                    if(extensionsToConvert.includes(fileExtension)){
                        convertToWebP(filePath);
                    }
                }
            })
        })
    })
}

searchFiles(inputFolder);