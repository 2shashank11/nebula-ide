const chokidar = require('chokidar');
const path = require('path');

function watchProjectDirectory(localPath, io) {
  const watcher = chokidar.watch(localPath 
, {
    persistent: true,
    ignoreInitial: true,
    usePolling: true,
  }
    );

  watcher.on('all', (event, filePath) => {
    // console.log(`File has been ${event}`);
    io.emit('file:refresh', filePath);
  });
}

module.exports = {
  watchProjectDirectory,
};