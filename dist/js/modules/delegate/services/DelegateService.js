app.factory('$delegateService', ['$web3Service', '$delegateContract', '$q', function ($web3Service, $delegateContract, $q) {
  return {

    delegate: function (candidate) {
      return $q(function (resolve, reject) {
        $web3Service.getAccounts().then(function (address) {
          var votingContract = web3.eth.contract($delegateContract.abi).at($delegateContract.address);
          votingContract.delegate(candidate).send({
            from : address
          });
          resolve();
        });
      });
    },

  }
}]);
