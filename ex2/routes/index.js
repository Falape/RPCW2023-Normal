var express = require('express');
var router = express.Router();
var axios = require('axios')

router.get('/', function (req, res) {
  var data = new Date().toISOString().substring(0, 16)
  console.log('olas')
  axios.get('http://localhost:15015/contracts')
    .then(response => {
      console.log("chega")
      const contracts = response.data;
      res.render('index', { slist: contracts, d: data });
    })
    .catch(error => {
      res.status(500).render('error', { error: 'Failed to retrieve contracts' });
    });
});

router.get('/contracts/:id', function(req, res) {
  var data = new Date().toISOString().substring(0, 16)
  const contractId = req.params.id;
  const apiUrl = `http://localhost:15015/contracts/${contractId}`;

  axios.get(apiUrl)
    .then(response => {
      const contract = response.data;
      res.render('contract', { contract: contract, d: data });
    })
    .catch(error => {
      res.status(500).render('error', { error: 'Failed to retrieve contract' });
    });
});
module.exports = router;
