var fs = require('fs')
var cheerio = require('cheerio')
var request = require('request')
let page = 1

start()

async function start() {
    for (let page = 1; page <= 770; page++) {
        console.log('Getting...' + page)
        let arrPhone = await getPhone(page)
        if (arrPhone) {
            fs.appendFileSync('sim.txt', arrPhone.join('\n') + '\n')
            console.log('Done page ' + page, arrPhone.length)
        }
    }
}



function getPhone(page) {
    // let query = 'https://simthanglong.vn/sim-theo-mang-di-dong/sim-so-dep-vinaphone-p' + page + '.html'
    // let query = 'https://simthanglong.vn/sim-theo-mang-di-dong/sim-so-dep-mobifone-p' + page + '.html'
    // let query = 'https://simthanglong.vn/sim-theo-mang-di-dong/sim-so-dep-vietnamobile-p' + page + '.html'
    // let query = 'https://simthanglong.vn/sim-theo-mang-di-dong/sim-so-dep-gmobile-p' + page + '.html'
    // let query = 'https://simthanglong.vn/sim-theo-mang-di-dong/sim-so-dep-viettel-p' + page + '.html'
    // let query = 'https://simsodep.com/Sim-So-Dep-VinaPhone.html?page='+page
    // let query = 'https://simsodep.com/Sim-So-Dep-MobiFone.html?page=' + page
    // let query = 'https://simsodep.com/Sim-So-Dep-Viettel.html?page='+page
    // let query = 'https://simsodep.com/Sim-So-Dep-VietNamobile.html?page=' + page
    let query = 'https://simsodep.com/Sim-So-Dep-Gmobile.html?page=' + page

    let arrPhone = []
    return new Promise((resolve, reject) => {
        request.get(query, (err, response, body) => {
            if (err) {
                console.log('Loi mang cmnr: ' + err)
                return 0
            }
            if (response.statusCode == 200) {
                let $ = cheerio.load(body)
                let phones = $('.sim')
                if (phones.length) {
                    for (let i = 0; i < phones.length; i++) {
                        let item = phones[i]
                        let phone = $(item).text().split('.').join('')
                        arrPhone.push(phone)
                        if (arrPhone.length == phones.length) {
                            resolve(arrPhone)
                        }
                    }
                } else {
                    resolve(0)
                }

            } else {
                console.log(query)
            }
        })
    })

}