var assert = require('assert');

suite('Testy', function() {
       test('Test na pustą kolekcję.', function(done, server) {
           server.eval(function() {
                       var amount = Kolekcja.find().fetch();
                       emit('amount', amount);
                       }).once('amount', function(amount) {
                               assert.equal(amount.length, 0);
                               done();
                               });
           });
      
      test('Czy istnieje użytkownik.', function(done, client) {
           client.eval(function() {
                       Kolekcja.insert({
                                       Name: 'asd'
                                       });
                       var usercheck = Kolekcja.find({
                                                     Name: 'asd'}).fetch();
                       emit('usercheck', usercheck);
                       });
           client.once('usercheck', function(usercheck) {
                       assert.equal(usercheck.length, 1);
                       done();
                       });
           });
      
      test("Nie możemy grać nie zalogowani.", function(done, client) {
           var ret = client.evalSync(function() {
                                     emit('return', 'foo');
                                     });
           done();
           });
      
      test('Dodanie usera.', function(done, client) {
           client.eval(function() {
                       Kolekcja.insert({ Name: 'User',
                                       Pass: 'password'
                                       });
                       var user = Kolekcja.find({ Name: 'User', Pass: 'password' }).fetch();
                       emit('user', user);
                       }).once('user', function(user) {
                               assert.equal(user.length, 1);
                               done();
                               });
           });
      
      test('Login błedne dane.', function(done, client) {
           client.eval(function() {
                       var login = "login";
                       var pass = "pass";
                       
                       var check = Kolekcja.find({ Name: login, Pass: pass }).fetch();
                       
                       emit('check', check);
                       }).once('check', function(check) {
                               assert.equal(check.length, 0);
                               done();
                               });
           });
      
      test('Login dobre dane.', function(done, client) {
           client.eval(function() {
                       var login = "login";
                       var pass = "pass";
                       
                       Kolekcja.insert({ Name: login,
                                       Pass: pass
                                       });
                       
                       var check = Kolekcja.find({ Name: login, Pass: pass }).fetch();
                       
                       emit('check', check);
                       }).once('check', function(check) {
                               assert.equal(check.length, 1);
                               done();
                               });
           });

      test('Update hasła', function(done, client) {
           client.eval(function() {
                       var login = "login";
                       var pass = "pass";
                       
                       Kolekcja.insert({ Name: login,
                                       Pass: pass
                                       });
                       
                       var user = Kolekcja.find({ Name: "login"}).fetch();
                       
                       Kolekcja.update({Name: "login"}, {$set: {Pass:"newpass" }});
                       
                       var check = Kolekcja.find({ Name: "login"}).fetch();
                       
                       emit('check', check);
                       }).once('check', function(check) {
                               assert.equal(check.length, 1);
                               done();
                               });
           });
//
      test('Update usera', function(done, client) {
           client.eval(function() {
                       var login = "login";
                       var pass = "pass";

                       Kolekcja.insert({ Name: login,
                                       Pass: pass
                                       });

                       var user = Kolekcja.find({ Name: "login"}).fetch();

                       Kolekcja.update({Name: "login"}, {$set: {Name:"newlog" }});

                       var check = Kolekcja.find({ Name:"newlog"}).fetch();

                       emit('check', check);
                       }).once('check', function(check) {
                               assert.equal(check.length, 1);
                               done();
                               });
           });
//
      test('Usuwanie użytkownika', function(done, client) {
           client.eval(function() {
                       
                       var login = "login";
                       var pass = "pass";
                       
                       Kolekcja.insert({ Name: login,
                                       Pass: pass
                                       });
                       
                       Kolekcja.remove({ Name: "login"
                                       });
                       
                       var check = Kolekcja.find({ Name: "login"}).fetch();
                       
                       emit('check', check);
                       }).once('check', function(check) {
                               assert.equal(check.length, 0);
                               done();
                               });
           });

      test('Nie można zarejestrować identycznych loginów.', function(done, client) {
           
						
           client.eval(function() {
           	var login = 'asd';
           	function check(arg) {
  							var user = Kolekcja.find({ Name: arg}).fetch();
  							
  							if(user.length > 0) {
    							return 1;
    						} else {
    							Kolekcja.insert({Name: arg, Pass: 'password'});
    							return 0;
    						}
						}
           	Kolekcja.insert({Name: login, Pass: 'password'});
           	
         		check(login);
         		
         		var result = Kolekcja.find({ Name: login}).fetch();
           
           	emit('result', result);
        }).once('result', function(result) {
                       assert.equal(result.length, 1);
                       done();
                       });
           });
     });

