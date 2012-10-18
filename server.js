// En enkel LDAP server för den stora organizationen :)
var ldap = require('ldapjs');

var server = ldap.createServer();

server.search('o=test', function(req, res, next) {
  var users = [];

  users.push({
    dn: req.dn.toString(),
    attributes: {
      objectclass: ['user'], 
      l     : 'Stockholm',
      email : 'andreas@test.se',
      fn    : 'Andreas Test',
      o     : 'test'
    }
  });

  users.push({
    dn: req.dn.toString(),
    attributes: {
      objectclass: ['user'], 
      l     : 'Malmö',
      email : 'kalle@test.se',
      fn    : 'Kalle Svensson',
      o     : 'test'
    }
  });

  // Låt oss nu söka bland våra användare
  for (var i=0;i<users.length;i++) {
    user = users[i];
    if (req.filter.matches(user.attributes))
      res.send(user);
  }

  res.end();
});

server.listen(1389, function() {
  console.log('ldapjs listening at ' + server.url);
});
