var fs = require('fs')
let dir = 'result'
let files = fs.readdirSync(dir)
files.forEach(file => {
    let filepath = dir + '/' + file
    let data = fs.readFileSync(filepath)
    let newData = data.toString().split('|').join('_')
    newData = newData.toString().split('VKL').join('|')
    fs.appendFileSync(dir + '/_ALL.txt', newData + '\n')
});

