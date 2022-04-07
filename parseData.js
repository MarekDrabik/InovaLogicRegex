const readline = require('readline');
const fs = require('fs');

const filePath = './data.txt';

function parseLineByLine () {
    const readInterface = readline.createInterface({
        input: fs.createReadStream(filePath),
        output: null,
        console: false
    });
    
    return readInterface;
}

module.exports = parseLineByLine;



