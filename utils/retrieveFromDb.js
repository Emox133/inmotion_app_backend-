const connection = require('../connection')

exports.getResults = (q, obj) => {
    return new Promise((resolve, reject) => {
      connection.query(
        q,
        obj,
        (err, result) => {
          return err ? reject(err) : resolve(result[0]);
        }
      );
    });
  }