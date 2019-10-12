const fs = require('fs');
const path = require('path');

// 写日志
function writeLog(writeStream, log) {
  writeStream.write(log + '\n');
}

// 生成write stream
function createWriteStream(fileName) {
  const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName);
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: 'a'
  });
  return writeStream;
}

const accessWriteStream = createWriteStream('access.log');

function access(log) {
  /* 写访问日志 */
  writeLog(accessWriteStream, log);
}

module.exports = {
  access
};
