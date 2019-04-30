app.factory('$web3Service', ['$q', function ($q) {
  return {
    /**
     * check is metamask exist
     * @returns {boolean}
     */
    checkEnableWallet : function () {
      return window.ethereum ? true : false;
    },

    /**
     * enable metamask;
     */
    enableAuth: function () {
      return window.ethereum.enable()
    },

    /**
     * �������� ��� ��������
     */
    getAccounts: function () {
      return $q(function (resolve, reject) {
        web3.eth.getAccounts(function (err, accounts) {
          resolve(accounts.pop());
        })
      })
    }
  }
}]);
