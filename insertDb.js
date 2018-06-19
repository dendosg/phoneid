const fs = require('fs');
var mongojs = require('mongojs')
const connectionString = 'mongodb://xuanhuy9519:matkhau12345@ds261430.mlab.com:61430/phoneid'
const collections = ['phone']
var db = mongojs(connectionString, collections)

let phones = fs.readFileSync('phone/result_1906_1.txt').toString().split('\r\n')
let dem = 0
start()
async function start() {
    for (let index = 0; index < phones.length; index++) {
        const phone = phones[index];
        let huy = await addDb(phone)
        dem++
        console.log(dem)

    }
}
function addDb(phone) {
    return new Promise((resolve, reject) => {
        db.phone.insert({ phone: phone }, (err, docs) => {
            if (err) throw err
            resolve(1)
        })
    })
}