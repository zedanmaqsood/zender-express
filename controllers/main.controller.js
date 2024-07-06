const path = require('path');
const fs = require('fs');

const { HOME_PATH, formatDir, separateFileAndDir, changePath } = require('../util/helper');

exports.getIndex = (req, res) => {
  res.redirect(`/${encodeURIComponent(HOME_PATH)}`);
}


exports.getDownloadFile = (req, res) => {
  const rawPath = req.params.path;
  const { dirPath, fileName } = separateFileAndDir(rawPath);

  console.log(rawPath);
  console.log("path: ", dirPath, fileName);

  res.download(path.join(dirPath, fileName), fileName, err => {
      if (err) {
          res.sendStatus(404);
      }
  });
}


exports.getDir = (req, res) => {
  const rawDir = req.params.dir;
  const dir = formatDir(rawDir);

  fs.readdir(dir, (err, items) => {
      if (err) {
          return res.sendStatus(404);
      }

      const files = [];
      const dirs = [];

      items.forEach(item => {
          try {
              const itemPath = path.join(dir, item);
              const stats = fs.lstatSync(itemPath);
              if (stats.isFile()) {
                  files.push(item);
              } else if (stats.isDirectory()) {
                  dirs.push(item);
              }
          } catch (err) {
              // Skip the file or directory if there's an error
              console.error(`Error reading ${item}: ${err.message}`);
          }
      });

      res.send(`
          <h1>Index of ${dir}</h1>
          <ul>
              ${dirs.map(d => `<li><a href="/${encodeURIComponent(path.join(dir, d))}">${d}/</a></li>`).join('')}
              ${files.map(f => `<li><a href="/download/${encodeURIComponent(path.join(dir, f))}">${f}</a></li>`).join('')}
          </ul>
      `);
  });
}