var fs = require('fs')
let data = fs.readFileSync('result/_ALL.txt').toString()
let data21 = fs.readFileSync('phone/PHONE_IN_DAKLAK_FINAL_22.txt').toString().split('\r\n')
data21.forEach(phone => {
    if (data.indexOf(phone.slice(2)) != -1) {
        fs.appendFileSync('file21.txt', phone + '\n')
    }
});
