var fs = require('fs')
var _ = require('lodash')
var request = require('request')
let success_count = 0;
let fail_count = 0;
let dem_scaned = 0;
let dem_item = 0;
let filename = '-IN_DAKLAK_FINAL_29'
// let filename = 'file21'
let path_scaned_fail = 'notFound_phone.txt'
let dataScaned_fail = fs.readFileSync(path_scaned_fail).toString()
fs.readFile('phone/PHONE_' + filename + '.txt', async (err, data) => {
    console.log('Checing data...')
    let sdts = data.toString().split('\r\n')
    let arrPhones = _.chunk(sdts, 50)
    for (var i = 0; i < arrPhones.length; i++) {
        let arrPhone = arrPhones[i]
        console.log('before=================', i)
        let arrUID = await getArrUID(arrPhone)
        console.log('Done ' + i, '===========================')
        if (arrUID.length) {
            fs.appendFileSync('result/_ALL.txt', arrUID.join('|') + '|')
        }
    }
})


function getArrUID(arrPhone) {
    return new Promise((resolve, reject) => {
        let arrUID = []
        arrPhone.forEach(async phone => {
            let isScaned = checkIsScaned(phone)
            if (!isScaned) {
                console.log(phone + ' is scaned')
                arrUID.push(0)
                if (arrUID.length == arrPhone.length) {
                    resolve(_.compact(arrUID))
                }
            } else {
                let newPhone = '0' + phone.slice(2)
                let msg = await getUID(newPhone)
                console.log('get done', msg)
                arrUID.push(msg)
                console.log(arrUID.length, arrPhone.length)
                if (arrUID.length == arrPhone.length) {
                    resolve(_.compact(arrUID))
                }
            }
        })
    });
}
function checkIsScaned(phone) {
    phone = phone.slice(2)
    let dataScaned = fs.readFileSync('result/_ALL.txt').toString()
    let position_scaned = dataScaned.indexOf('_0' + phone)
    let position_notFound = dataScaned_fail.indexOf('0' + phone)
    return (position_scaned == -1 && position_notFound == -1)
}
function getUID(phone) {
    var options = {
        url: 'http://izfabo.com/phoneid/phoneid.php?phone=' + phone
    };
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) {
                console.log('Loi internet cmnr ' + error, phone)
                return 0
            }
            if (response.statusCode == 200 && body.indexOf('code') != -1) {
                console.log(body)
                let bodyJson = JSON.parse(body)
                if (bodyJson) {
                    if (bodyJson.code == 200) {
                        let msg = bodyJson.uid + '_' + phone
                        success_count++;
                        console.log(success_count, msg)
                        resolve(msg)
                    } else {
                        fail_count++;
                        console.log(fail_count, phone, body)
                        fs.appendFileSync(path_scaned_fail, phone + '\n')
                        resolve(0)
                    }
                } else {
                    fail_count++;
                    console.log(fail_count, phone, body)
                    resolve(0)
                }
            } else {
                let msg = '=========ERROR==========='
                console.log(phone, msg, response.statusCode)
                resolve(0)
            }
        })
    })
}