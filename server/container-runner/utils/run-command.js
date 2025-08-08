const path = require('path');

const getRunCommand = (filePath, language) => {
    const fileName = path.basename(filePath);
    const fileNameWithoutExt = fileName.split('.').slice(0, -1).join('.');

    switch (language.toLowerCase()) {
        case 'javascript':
            return `node .${filePath}`;

        case 'python':
            return `python3 .${filePath}`;

        case 'java':
            return `javac .${filePath} && java -cp .${path.dirname(filePath)} ${fileNameWithoutExt}`;

        case 'cpp':
            return `g++ .${filePath} -o ${fileNameWithoutExt}.exe && ./${fileNameWithoutExt}.exe`;
            // return `g++ .${filePath} -o ${fileNameWithoutExt}.out && ${fileNameWithoutExt}.out`;


        case 'c':
            return `gcc .${filePath} -o ${fileNameWithoutExt}.exe && ./${fileNameWithoutExt}.exe`;
            // return `g++ .${filePath} -o ${fileNameWithoutExt}.out && ${fileNameWithoutExt}.out`;

        case 'go':
            return `go run .${filePath}`;

        case 'typescript':
            return `ts-node .${filePath}`;

        case 'plaintext':
            return `cat ${filePath}`;

        default:
            throw new Error(`Unsupported language: ${language}`);
    }
};


module.exports = getRunCommand;