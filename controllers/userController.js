const connection = require('../connection')
const AppError = require('../utils/AppError')

exports.getAllUsers = (req, res, next) => {
    let q = 'SELECT * FROM users'

    connection.query(q, function(err, results) {
        if(err) throw err
        res.status(200).json({
            results
        })
    })
}

exports.getCurrentlyLoggedInUser = (req, res, next) => {
    let currentUser = req.user

    res.status(200).json({
        message: 'success',
        currentUser
    })
}

exports.deleteUsers = (req, res, next) => {
    const userId = req.params.id

    connection.query(`SELECT * FROM users WHERE id=${userId}`, function(err, results) {
        if(err) throw err
        console.log(results, userId)
        let fetchedUser = results[0]
        if(!fetchedUser) {
            res.status(404).json({
                message: 'There is no user with the given id.'
            })
        }
    })
    
    connection.query(`DELETE FROM users WHERE id=${userId}`, function(err, results) {
        if(err) throw err
        console.log(results)
        res.status(204).json({
            message: 'success'
        })
    })
}

exports.sendNotifications = (req, res, next) => {
    let sender = req.user.id
    let receiver = req.params.userId

    if(!sender || !receiver) {
        return next(new AppError('Something went wrong withe notification sending', 404))
    }

    let newNotification = {
        notification_sender: +sender,
        notification_receiver: +receiver
    }

    connection.query(`INSERT INTO notifications SET ?`, newNotification, function(err, results) {
        if(err) throw err
        console.log(results)
    })

    res.status(201).json({
        message: 'success',
        newNotification
    })
}

exports.getNotifications = (req, res, next) => {
    connection.query(`SELECT * FROM notifications WHERE notification_receiver = ${req.user.id}`, function(err, results) {
        if(err) throw err
        console.log(results)
        res.status(200).json({
            message: 'success',
            results
        })      
    })
}









