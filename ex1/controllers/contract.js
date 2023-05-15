var Contract = require('../models/contract')

module.exports.list = () => {
    return Contract
        .find()
        .then(contracts => {
            return  contracts
        })
        .catch(error => {
            return error
        });
}

module.exports.getContract = id => {
    return Contract
        .findOne({_id: id})
        .then(contract => {
            return contract
        })
        .catch(error => {
            return error
        })
}

module.exports.find = filter => {
    return Contract
        .find(filter)
        .then(contracts => {
            return contracts
        }) 
        .catch(error => {
            return error
        })
}

// Controller for GET /contracts/institutions
module.exports.getInstitutions = function() {
    console.log('GET institutions');
    return Contract.aggregate([
      { $group: { _id: { NomeInstituicao: "$NomeInstituicao", NIPCInstituicao: "$NIPCInstituicao" } } },
      { $project: { _id: 0, NomeInstituicao: "$_id.NomeInstituicao", NIPCInstituicao: "$_id.NIPCInstituicao" } }
    ])
      .then(institutions => {
        //console.log(institutions)
        return institutions;
      })
      .catch(error => {
        return error;
      });
  };
  

module.exports.getContractsByYear = (endDate, startDate) => {
    console.log(startDate, endDate)
    return Contract.find({
        DataInicioContrato: { $gte: startDate, $lt: endDate }
      })
      .then(contracts => {
          return contracts
      })
        .catch (error =>{
        return error;
    })
}
