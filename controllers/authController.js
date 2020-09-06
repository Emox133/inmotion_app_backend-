const connection = require('../connection')
const bcrypt = require('bcryptjs')
const {promisify, log} = require('util')
const jwt = require('jsonwebtoken')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const Email = require('../utils/email')
const {getResults} = require('../utils/retrieveFromDb')

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  };
  
  const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user.id);
<<<<<<< HEAD
    // Remove password from output
=======
    // Remove pwd from output
>>>>>>> 25421610e2622a0447bb2a9970c970fcf36693eb
    user.hash = undefined;
  
    res.status(statusCode).json({
      status: 'success',
      token,
      user
    });
  };

exports.protect = catchAsync(async (req, res, next) => {
<<<<<<< HEAD
    // 1) Getting token and check of it's there
=======
    // 1) Getting token and check of its there
>>>>>>> 25421610e2622a0447bb2a9970c970fcf36693eb
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
  
    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }
  
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
    // 3) Check if user still exists    
    const currentUser = await getResults(`SELECT * FROM users WHERE id = ${decoded.id}`);
    
    if (!currentUser) {
        return next(
          new AppError(
            'The user belonging to this token does no longer exist.',
            401
          )
        );
    } 

    req.user = currentUser;
    res.locals.user = currentUser;
    
    // GRANT ACCESS TO PROTECTED ROUTE
    next();
  });

exports.signup = catchAsync(async(req, res, next) => {
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        role: req.body.role
    }

    for(let key in newUser) {
        if(newUser[key].length <= 0) {
<<<<<<< HEAD
            return next(new AppError('Fields cannot be empty.', 400))
=======
            return next(new AppError('Fields can not be empty.', 400))
>>>>>>> 25421610e2622a0447bb2a9970c970fcf36693eb
        }
    }

    if(newUser.password !== newUser.confirmPassword) {
        return next(new AppError('Passwords do not match!', 400))
    }

    const hash = await bcrypt.hash(newUser.password.toString(), 10)
    
    delete newUser.password
    newUser.confirmPassword = undefined

    newUser.hash = hash
    
    const url = `${req.protocol}://${req.get('host')}/me`;
    connection.query('INSERT INTO users SET ?', newUser, async function(err, results) {
        try {
            await new Email(newUser, url).sendWelcome()
            newUser.id = results.insertId
            createSendToken(newUser, 201, req, res)
        }
        
        catch(e) {
            console.log(e)
            if(err) throw err
        }
    })
})

exports.login = catchAsync(async(req, res, next) => {
    // const {email, password} = req.body
    const logingUser = {
        email: req.body.email,
        password: req.body.password
    }

    let q = `SELECT id, firstName, lastName AS name, email, hash FROM users WHERE email = "${logingUser.email}"`

    connection.query(q, async function(err, results, fields) {
        try {
            let user = results[0]
            let validPass = await bcrypt.compare(logingUser.password, user.hash)
            if(!validPass) {
                return next(new AppError('Your password is not correct. Please try again.', 401))
            }
            if(!user) {
                return next(new AppError('There is no user with this credentials!'), 404)
            }

            delete user.hash
           
            createSendToken(user, 200, req, res)
        }
        catch(e) {
            console.log(e)
            if(err) throw err
        }
    })
})

// USER ROLES 
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permissions to perform this kind of action.', 403))
        }
        next()
    }
}