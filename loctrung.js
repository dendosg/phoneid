var fs = require('fs')
// let All = fs.readFileSync('result/_ALL.txt').toString().split('|')
let arrPhone_scaned = []
All.forEach((item, i) => {
    let phone = item.split('_')[1]
    if (phone) {
        if (phone.length > 11 || phone.length < 10) {
            phone = formatPhone(phone)
        }
        arrPhone_scaned.push(phone)
        console.log(i, phone.length)
        if (arrPhone_scaned.length == All.length) {
            fs.appendFileSync('loctrung_phone_scaned.txt', arrPhone_scaned.join('\n'))
            console.log('Done')
        }
    }

});


function formatPhone(phone) {
    let dau4So = phone.slice(0, 4)
    let dau3So = phone.slice(0, 3)
    // Kiem tra 3 so
    switch (dau3So) {
        case '090':
        case '091':
        case '092':
        case '093':
        case '094':
        case '096':
        case '097':
        case '098':
        case '099':
        case '089':
        case '088':
        case '086':
            return phone.slice(0, 10)

        default:
            break;
    }
    // Kiem tra 4 so
    switch (dau4So) {
        case '0120':
        case '0121':
        case '0122':
        case '0123':
        case '0124':
        case '0125':
        case '0126':
        case '0127':
        case '0128':
        case '0129':
        case '0162':
        case '0163':
        case '0164':
        case '0165':
        case '0166':
        case '0167':
        case '0168':
        case '0169':
        case '0188':
        case '0186':
        case '0199':
            return phone.slice(0, 11)
            break;

        default:
            console.log('Undefined ', phone)
            break;
    }
}