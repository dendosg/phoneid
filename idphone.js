var request = require('request')
var _ = require('lodash')
var fs = require('fs')
let path_UIDs_notFound = 'notFound_UID.txt'
let path_result = 'result/_ALL.txt'
let path_UIDs = 'Trung tâm giải trí Star Light-1.txt';
let success_count = 0;
let fail_count = 0;
let dem_scaned = 0
let notFound = fs.readFileSync(path_UIDs_notFound).toString()


let UIDs = fs.readFileSync(path_UIDs).toString().split('\r\n')
let arrArrUID = _.chunk(UIDs, 50)
start()
async function start() {
    for (let i = 0; i < arrArrUID.length; i++) {
        let arrUID = arrArrUID[i]
        let arrPhone = await getArrPhone(arrUID)
        if (arrPhone.length) {
            fs.appendFileSync(path_result, arrPhone.join('|') + '|')
        }
        console.log('Done: ' + i)
    }
}



function getArrPhone(arrUID) {
    let arrPhone = []
    return new Promise((resolve, reject) => {
        arrUID.forEach(async UID => {
            if (checkIsScaned(UID)) {
                let phone = await getPhone(UID)
                arrPhone.push(phone)
                if (arrPhone.length == arrUID.length) {
                    resolve(_.compact(arrPhone))
                }
            } else {
                arrPhone.push(0)
                console.log(UID + ' is scaned')
                if (arrPhone.length == arrUID.length) {
                    resolve(_.compact(arrPhone))
                }
            }
        });
    })
}


function getPhone(UID) {
    let query = 'http://izfabo.com/idphone/phoneid.php?uid=' + UID
    return new Promise((resolve, rejects) => {
        request.get(query, (error, response, body) => {
            if (error) {
                console.log('Kiem tra ket noi mang: ' + error)
                return 0
            }
            if (response.statusCode == 200) {
                let bodyJson = JSON.parse(body)
                if (bodyJson.code == 200) {
                    let msg = UID + '_' + bodyJson.phone
                    success_count++;
                    console.log(success_count, body)
                    resolve(msg)
                } else {
                    fail_count++
                    fs.appendFileSync(path_UIDs_notFound, UID + '\n')
                    console.log(fail_count, UID, bodyJson)
                    resolve(0)
                }
            } else {
                let msg = '=========ERROR==========='
                console.log(UID, msg, response.statusCode)
                resolve(0)
            }
        })
    })
}


function checkIsScaned(UID) {
    let scaned = fs.readFileSync(path_result).toString()
    let position_scaned = scaned.indexOf(UID)
    let position_notFound = notFound.indexOf(UID)
    return (position_scaned == -1 && position_notFound == -1)
}