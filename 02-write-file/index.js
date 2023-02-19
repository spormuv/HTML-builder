const fs = require('fs');
const path = require('path');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

output.write('Type any text\n');
const rl = readline.createInterface({ input, output });

rl.on('line', (line) => {
  if (line === 'exit') {
    rl.close();
    return;
  }
  writeStream.write(line + ' ');
});

rl.on('close', () => {
  output.write('End of input');
});
