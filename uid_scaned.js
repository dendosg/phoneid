var fs = require('fs')
let allData = fs.readFileSync('result/_ALL.txt').toString().split('|')
let arrUID = []
let dem = 0
let UID_notFound = fs.readFileSync('notFound_UID.txt').toString().split('\n')

allData.forEach(data => {
    // let phone = data.split('_')[1]
    // if (phone) {
    //     if (phone.length > 11 || phone.length < 10) {
    //         dem++
    //         console.log(dem, phone)
    //     }
    // }

    // Lọc UID
    let UID = data.split('_')[0]
    arrUID.push(UID)
    if (arrUID.length == allData.length) {
        console.log('Done')
        fs.writeFileSync('allUID.txt', arrUID.concat(UID_notFound).join('\n'))
    }
});