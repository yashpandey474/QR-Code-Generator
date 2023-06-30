/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import fs from "fs";
import inquirer from 'inquirer';
import qr from "qr-image"

inquirer
    .prompt([{
        "message": "Type in your URL",
        name: "URL"
    }])
    .then((answers) => {
        const URL = answers.URL;

        //2. TURN USER INPUT TO QR CODE IMAGE
        var qr_png = qr.image(URL); //DEFAULT: PNG
        qr_png.pipe(fs.createWriteStream('qr_image.png'));
        

        //3.TXT FILE TO SAVE USER INPUT
        fs.writeFile(
            "URL.txt",
            URL,
            (err) => {
                if (err) {
                    throw err;
                }
                console.log("URL Saved Successfully!");
            }

        )
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    });





