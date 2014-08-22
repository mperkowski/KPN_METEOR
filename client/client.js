var Users = new Meteor.Collection("Users");
var userChoice = "";
var computerChoice;

function wynik(ktoWygral, wybor) {
  var wygrany = null;
  var img = null;
  
  if (ktoWygral == "komp") {
    wygrany = "Wygrał komputer :(";
    document.getElementById("wynikTitle").innerHTML = wygrany;
  }
  else if (ktoWygral == "remis" && wybor == "="){
    wygrany = "Remis...";
    img = "http://hinessight.blogs.com/.a/6a00d83451c0aa69e201156fde81a1970b-800wi";
    document.getElementById("wynikTitle").innerHTML = wygrany;
    document.getElementById("wynikImg").src = img;
  }
  
  else {
    wygrany = "Wygrałeś!!!";
    document.getElementById("wynikTitle").innerHTML = wygrany;
  }
  
  if(wybor == "kamien") {
    img = "http://api.ning.com/files/LAl787uzrCBNj78tFGC9a8RUl82ZJxLeO1FeJCK57wnj015hTmfxgTR*BHCWuy8aeQXYG-GuEdjLqnXTuB1ihGXoJCL5418X/Rolling_Stone_Animation_by_shadixART.gif";
    document.getElementById("wynikImg").src = img;
  }
  
  else if(wybor == "nozyce") {
    img = "http://31.media.tumblr.com/ff501d3e5dda6aba90511a656a96a939/tumblr_mu783dmNnD1rqf6m7o1_250.gif";
    document.getElementById("wynikImg").src = img;
  }
  
  else if(wybor == "papier") {
    img = "http://fc03.deviantart.net/fs70/f/2012/243/a/f/paper_plane_by_bagam-d5d1sht.gif";
    document.getElementById("wynikImg").src = img;
  }
  
  
  
  
  
  $(".gra").fadeOut();
  $(".wynik").fadeIn();
  
}

function register(log) {
  var login = document.getElementById(log).value;
  
  var check = Users.find({ Name: login});
  
  if(check.count() > 0) {
    confirm("Podany login jest zajęty!");
    
  } else {
    Users.insert
    ({ Name: document.getElementById("inputlogin").value,  Pass: document.getElementById("inputpass").value, Numer: userID});
    userID= userID + 1;
    $(".register").fadeOut();
    $(".login").fadeIn();
  }
}

var compare = function (choice1, choice2) {
  var winner;
  if (choice1 === choice2) {
    winner = "remis";
    wynik("remis", "=");
    
  }
  
  if (choice1 === "kamien" && choice2 ==="nozyce")
  {
    winner = "user";
    wynik("user", "kamien");
  }
  if (choice1 === "nozyce" && choice2 ==="kamien"){
    winner = "komp";
    wynik("komp", "kamien");
  }
  if (choice1 === "papier" && choice2 === "kamien") {
    winner = "user";
    wynik("user", "papier");
  }
  if (choice1 === "kamien" && choice2 === "papier"){
    winner = "komp";
    wynik("komp", "papier");
  }
  if (choice1 === "nozyce" && choice2 === "papier") {
    winner = "user";
    wynik("user", "nozyce");
  }
  if (choice1 === "papier" && choice2 === "nozyce"){
    winner = "komp";
    wynik("komp", "nozyce");
  }
  
  return winner;
  
};

function ktoWygral(userChoice) {
  $(".gra").fadeOut();
  computerChoice = Math.random();
  
  if (computerChoice < 0.34) {
    computerChoice = "kamien";
  } else if(computerChoice <= 0.67) {
    computerChoice = "papier";
  } else {
    computerChoice = "nozyce";
  }
  
  
  var winner = compare(userChoice, computerChoice);
  return winner;
  
}


Template.wynik.events({
                      "click #again" : function() {
                      $(".gra").fadeIn();
                      $(".wynik").fadeOut();
                      }
                      });


Template.login.events({
                      "click #submitbtn": function() {
                      var login = document.getElementById("inputLogin").value;
                      var pass = document.getElementById("inputPass").value;
                      
                      var check = Users.find({ Name: login, Pass: pass });
                      
                      if(check.count() == 1) {
                      $(".login").fadeOut();
                      $(".poof").fadeOut();
                      $(".gra").fadeIn();
                      
                      $(".kamien").fadeIn();
                      $(".papier").fadeIn();
                      $(".nozyce").fadeIn();
                      } else {
                      confirm("Błędne dane logowania!");
                      }
                      
                      },
                      
                      "click #registerbtn": function() {
                      $(".login").fadeOut();
                      $(".register").fadeIn();
                      }
                      
                      
                      });

Template.register.events({
                         "click #backbtn": function() {
                         
                         $(".register").fadeOut();
                         $(".login").fadeIn();
                         },
                         "click #registerbtn" : function() {                         register("inputlogin");
                         
                         }
                         
                         });


Template.gra.events({
                    
                    "click #kam": function() {
                    
                    userChoice = "kamien";
                    ktoWygral(userChoice);
                    },
                    
                    "click #pap": function() {
                    userChoice = "papier";
                    ktoWygral(userChoice);
                    },
                    
                    "click #noz": function() {
                    userChoice = "nozyce";
                    ktoWygral(userChoice);
                    },
                    
                    "click #off": function() {
                    
                    $(".gra").fadeOut();
                    $(".login").fadeIn();
                    },
                    
                    
                    
                    
                    });
Template.Users.cardItems = function() {
  return Users.find({}, {sort: {Name : 1}});
};
