const fs = require('fs')
const Instagram = require('instagram-web-api')
const request = require('request')
const client = new Instagram({ username: 'huymee8', password: '12351253' })
// 
let dem = 0
client.login().then(async () => {
    console.log('Logined')
    let aaa = await client.search({ query: 'lan vy', context: 'user' })
    console.log(aaa.users.length)
})

function getInfoByUsername(username) {
    return new Promise((resolve, reject) => {
        request.get('https://www.instapi.io/u/' + username, (err, response, body) => {
            if (err) {
                console.log('Loi cmnr' + err)
                resolve(0)
            } else {
                console.log(response.statusCode)
                if (response.statusCode == 200) {
                    resolve(JSON.parse(body))
                }
            }
        })
    })
}


