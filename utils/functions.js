const fs = require('fs');

const getFiles = (path, ending) => {
    return fs.readdirSync(path).filter(files => files.endsWith(ending))
};

module.exports = {
    getFiles
};