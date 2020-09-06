const connection = require('../connection')

exports.createPosts = (req, res, next) => {
    const contentValues = {
        heading: req.body.heading,
        content: req.body.content,
        postOwner: req.user.id
    }

    if(contentValues.heading.trim() === '' || contentValues.content.trim() === '') {
        res.status(400).json({
            message: 'Fields cannot be empty!'
        })
        return next()
    }

    connection.query('INSERT INTO documents SET ?', contentValues, function(err, results) {
        if(err) throw err
        console.log(results)
        res.status(201).json({
            message: 'success',
            contentValues
        })
    })
}

exports.getAllPosts = (req, res, next) => {
    const q = 'SELECT * FROM documents'

    connection.query(q, function(err, results) {
        if(err) throw err
        console.log(results)       
        res.status(200).json({ 
            message: 'success',
            results
        })
    })
}

exports.updatePosts = (req, res, next) => {
    const post = req.params.id
    let updateValues = {
        heading: req.body.heading,
        content: req.body.content
    }
    
    connection.query(`SELECT * FROM documents WHERE id = ${post}`, function(err, results) {
        if(err) throw err
        // console.log('The fetched post is:',results[0].id)
        let fetchedPost = results[0]
        if(!fetchedPost) {
            res.status(404).json({
                message: 'There is no post with this id.'
            })
            return next()
        }
    })

    if(updateValues.heading.trim() === '' || updateValues.content.trim() === '') {
        res.status(400).json({
            message: 'Fields for updating cannot be empty'
        })
        return next()
    }

    connection.query(`UPDATE documents SET ? WHERE id=${post}`, updateValues, function(err, results) {
        if(err) throw err
        // console.log(results)
        res.status(200).json({
            message: 'success',
            updateValues
        })
    })
}

exports.deletePosts = (req, res, next) => {
    const post = req.params.id

    connection.query(`SELECT * FROM documents WHERE id=${post}`, function(err, results) {
        if(err) throw err
        let fetchedPost = results[0]
        if(!fetchedPost) {
            res.status(404).json({
                message: 'There is no post with the given id.'
            })
        }
    })
    
    connection.query(`DELETE FROM documents WHERE id=${post}`, function(err, results) {
        if(err) throw err
        console.log(results)
        res.status(204).json({
            message: 'success'
        })
    })
}

