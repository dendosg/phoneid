var _ = require('lodash')
var fs = require('fs')
fs.readFile('phone/_DAKLAK_FINAL_3TR.txt', (err, data) => {
    let arrPhone = data.toString().split('\n')
    let arrNew = _.chunk(arrPhone, 50000)
    for (var i = 0; i < arrNew.length; i++) {
        let arrPhoneNew = arrNew[i]
        fs.writeFileSync('phone/PHONE_IN_DAKLAK_FINAL_' + i + '.txt', arrPhoneNew.join('\n'))
    }
})