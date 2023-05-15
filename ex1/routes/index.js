var express = require('express');
var router = express.Router();
var contractModel = require('../models/contract');
var Contract = require('../controllers/contract')
const moment = require('moment');


router.get('/contracts', (req, res) => {
  const { year, inst } = req.query;

  switch (true) {
    case year !== undefined:
      console.log('GET by year');
      // Create the start and end dates of the year
      const startDate = new Date(year, 0, 1);
      var yearN = parseInt(year) + 1;
      const endDate = new Date(yearN, 0, 1);
      Contract.getContractsByYear(endDate, startDate)
        .then(contracts => {
          console.log(contracts);
          res.status(200).jsonp(contracts);
        })
        .catch(error => {
          res.status(500).jsonp({ error: 'Failed to retrieve contracts' });
        });

      break;
    case inst !== undefined:
        Contract.find({ NomeInstituicao: inst })
          .then(contracts => {
            res.jsonp(contracts);
          })
          .catch(error => {
            res.status(500).jsonp({ error: 'Failed to retrieve contracts' });
          });
      break;
    default:
      Contract.list()
        .then(contracts => {
          res.status(200).jsonp(contracts);
        })
        .catch(error => {
          res.status(500).jsonp({ error: 'Failed to retrieve contracts' });
        });
  }
});

router.get('/contracts/courses', function(req, res) {
  console.log('GET courses');
  contractModel.distinct('Curso')
    .then(courses => {
      res.jsonp(courses);
    })
    .catch(error => {
      res.status(500).jsonp({ error: 'Failed to retrieve courses' });
    });
});


router.get('/contracts/institutions', function(req, res) {
  console.log('GET courses');
  Contract.getInstitutions()
    .then(inst => {
      console.log("inst", inst)
      res.jsonp(inst);
    })
    .catch(error => {
      res.status(500).jsonp({ error: 'Failed to retrieve courses' });
    });
});

router.post('/contracts', function (req, res) {
  //console.log(req.body)
  req.body.DataInicioContrato = moment(req.body.DataInicioContrato, 'YYYY-MM-DD').toDate();
  req.body.DataFimContrato = moment(req.body.DataFimContrato, 'YYYY-MM-DD').toDate();
  //console.log(req.body.DataInicioContrato)
  var newContract = new contractModel(req.body);
  console.log(newContract)
  // Save the new contract to the database
  newContract.save()
    .then(savedContract => {
      res.status(201).jsonp(savedContract);
    })
    .catch(error => {
      res.status(500).jsonp({ error: 'Failed to create contract' });
    });
});

router.get('/contracts/:id', function (req, res) {
  console.log('GET by id');
  try {
    const contractId = req.params.id;

    Contract.getContract(contractId)
      .then(contract => {
        if (contract) {
          res.jsonp(contract);
        } else {
          res.status(404).jsonp({ error: 'Contract not found' });
        }
      })
      .catch(error => {
        res.status(500).jsonp({ error: 'Failed to retrieve contract' });
      });
  } catch (error) {
    res.status(500).jsonp({ error: 'Failed to retrieve contract' });
  }
});


router.delete('/contracts/:id', function(req, res) {
  var contractId = req.params.id;

  // Find the contract by its ID and remove it from the database
  contractModel.findByIdAndRemove(contractId)
    .then(removedContract => {
      if (removedContract) {
        res.status(200).json({ message: 'Contract removed successfully' });
      } else {
        res.status(404).json({ error: 'Contract not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to remove contract' });
    });
});


module.exports = router;
