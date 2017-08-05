var xero = require('xero-node');
var fs = require('fs');
var config = require('../config.json');

//Private key can either be a path or a String so check both variables and make sure the path has been parsed.
if (config.privateKeyPath && !config.privateKey)
    config.privateKey = fs.readFileSync(config.privateKeyPath);

var xeroClient = new xero.PrivateApplication(config);

module.exports = () => {
  const promises = [
    xeroClient.core.items.getItems()
  ];
  return Promise.all(promises);
}