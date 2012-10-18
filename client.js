var ldap = require('ldapjs');

var client = ldap.createClient({
  url: 'ldap://127.0.0.1:1389'
});


// Söker på alla i den stora organizationen som är i Stockholm
var opts = {
  filter: '(l=Stockholm)', // Bör även funka med Malmö
  // filter: '(email=*@test.se)', // En test med fler svar
  scope: 'sub'
};

client.search('o=test', opts, function(err, res) {

  res.on('searchEntry', function(entry) {
    console.log('entry: ' + JSON.stringify(entry.object));
  });

  res.on('searchReference', function(referral) {
    console.log('referral: ' + referral.uris.join());
  });

  res.on('error', function(err) {
    console.error('error: ' + err.message);
  });

  res.on('end', function(result) {
    console.log('status: ' + result.status);
    process.exit();
  });

});
