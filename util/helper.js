const path = require('path');

// Define the home path
exports.HOME_PATH = path.join("G:");

// Helper function to format directory paths
exports.formatDir = (rawDir) => {
    return rawDir.split('/').join(path.sep);
}

// Helper function to change paths
exports.changePath = (currentPath, toPath) => {
    if (toPath === "..") {
        return path.resolve(currentPath, '..');
    } else {
        return path.join(currentPath, toPath);
    }
}

// Helper function to separate file and directory
exports.separateFileAndDir = (filePath) => {
    const dirPath = path.dirname(filePath);
    const fileName = path.basename(filePath);
    return { dirPath, fileName };
}