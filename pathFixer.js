const fs = require('fs');

const FILE = 'build/index.html';
const WRONG_PATH = '="/static';
const CORRECT_PATH = '="./static';

const html = fs.readFileSync(FILE, 'utf8');

let newHtml = html;
while (newHtml.includes(WRONG_PATH)) {
  newHtml = newHtml.replace(WRONG_PATH, CORRECT_PATH);
}

fs.writeFileSync(FILE, newHtml);
console.log('All paths fixed');