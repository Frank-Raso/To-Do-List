const express = require('express');
const listRouter = express.Router();

// DB CONNECTION
const pool = require('../routes/pool');

// GET
listRouter.get('/', (req, res) => {
  console.log('in /to_do GET');
  const queryString = `SELECT * FROM to_do;`;
  pool.query(queryString).then((result) => {
    res.send(result.rows);
  }).catch((err) => {
    console.log(err);
    res.sendStatus(500);
  })
})

// POST
listRouter.post('/', (req, res) => {
  console.log('in /do_do POST:', req.body);
  const queryString = `INSERT INTO to_do (task, complete) VALUES ($1, $2);`
  const values = [req.body.task, req.body.complete];
  pool.query(queryString, values).then((result) => {
    res.sendStatus(200);
  }).catch((err) => {
    console.log(err);
    res.sendStatus(500);
  })
});

// PUT
listRouter.put('/', (req, res) => {
  console.log('in /to_do PUT:', req.query);
  let queryString = `UPDATE to_do SET complete = 'Y' WHERE id=$1;`;
  let values = [req.query.id];
  pool.query(queryString, values).then((results) => {
    res.sendStatus(200);
  }).catch((err) => {
    console.log(err);
    res.sendStatus(500);
  })
})


// DELETE
listRouter.delete('/', (req, res) => {
  console.log('/to_do DELETE:', req.query);
  /// - DELETE FROM to_do WHERE id=1 ->req.query.id
  let queryString = 'DELETE FROM to_do WHERE id=$1';
  let values = [req.query.id];
  pool.query(queryString, values).then((results) => {
    res.sendStatus(200);
  }).catch((err) => {
    console.log(err);
    res.sendStatus(500);
  })
})





module.exports = listRouter;
