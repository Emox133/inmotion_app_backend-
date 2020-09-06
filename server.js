const dotenv = require('dotenv')
const app = require('./app')

<<<<<<< HEAD
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
  });
  

=======
>>>>>>> 25421610e2622a0447bb2a9970c970fcf36693eb
dotenv.config({path: './config.env'})

const port = process.env.PORT || 3000

<<<<<<< HEAD
const server = app.listen(port, () => {
    console.log(`App running on ${port}`)
})

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });
  
  process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
      console.log('💥 Process terminated!');
    });
  });
  
=======
app.listen(port, () => {
    console.log(`App running on ${port}`)
})
>>>>>>> 25421610e2622a0447bb2a9970c970fcf36693eb
