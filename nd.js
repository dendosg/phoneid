var request = require('request')

request.get('http://gddt.daklak.gov.vn/ket-qua-diem-tuyen-sinh-vao-lop-10-thpt-chuyen-nguyen-du-va-thpt-dtnt-ntrang-long-nam-hoc-2018-2019.html', (err, res, body) => {
    console.log(body)
})