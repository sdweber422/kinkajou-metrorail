const express = require('express');
const router = express.Router();
const Train = require('../db/commands/Train')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("YAY");
});

router.post('/train', ( request, response, next ) => {
  Promise.resolve( Train.create({ capacity: 50, location: 'annex' }) )
  .then( result => {
    response.send('Peh')
  })
  .catch( error => response.send(error))
})

router.get('/train/:id', ( request, response, next) => {
  const { id } = request.params
  Promise.resolve( Train.getById( id ) )
  .then( train => {
    response.send('For us.')
  })
})


module.exports = router;
