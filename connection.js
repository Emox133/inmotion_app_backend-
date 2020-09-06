const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'bkbvak5rp96ge5bzesks-mysql.services.clever-cloud.com',
    user: 'uxrocz3rgvtjzkct',
    database: 'bkbvak5rp96ge5bzesks',
    password: 'Nf0hyDVsKpwpVQKVMRTg'
})

connection.connect((err) => {
    if(err) {
        console.log(`Error connecting ${err.stack}`)
        return
    }
    
    console.log(`Connected as id: ${connection.threadId}`)
})


module.exports = connection
