var express = require('express');
//var path = require('path');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var database = require('./database');

var app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

var router = express.Router();

//Managing /publications requests
router.route('/publications')

//The post request must have titre, auteur, contenu, themes, files, and forms attributes
.post(function(req, res){
  let pub = req.body;
  database.getPublicationsNumber(function(nb){
    let nbr = 9-String(++nb).length; 
    pub.id = "P"+"0".repeat(nbr)+nb;
    database.addPublication(pub);
  });
})

.get(function(req, res){
  //console.log(req);
  database.getAllPublications(function(pubs){
    //console.log(req+" : OK");
    res.json(pubs);
  });
});

router.route('/publications/:pubID')

.get(function(req, res){
  database.getPublication(req.params.pubID, function(pub){
    res.json(pub);
  })
})

//The put request must have titre and contenu attributes
.put(function(req, res){
  let pub = req.body;
  pub.id=req.params.pubID;
  database.updatePublicationContent(pub);
})

.delete(function(req, res){
  database.updatePublicationState(req.params.pubID, false);
});

//Managing publication related routes

//Managing commentaires route
router.route('/publications/:pubID/commentaires')

.post(function(req, res){
  let com = req.body;
  database.getCommentaires(req.params.pubID, function(coms){
    com.id = coms.length+1;
    database.addComment(com);
  })
})

.get(function(req, res){
  database.getCommentaires(req.params.pubID, function(coms){
    res.json(coms);
  })
});



//Managing remarques route
router.route('/publications/:pubID/remarques')

.post(function(req, res){
  database.addRemarque(req.body.user, req.params.pubID, req.body.contenu);
})

.get(function(req, res){
  database.getRemarques(req.params.pubID, function(rems){
    res.json(rems);
  })
});


//Managing signalements route
router.route('/publications/:pubID/signalements')

.post(function(req, res){
  database.addSignalment(req.body.user, req.params.pubID, req.body.contenu);
})

.get(function(req, res){
  database.getSignalements(req.params.pubID, function(signals){
    res.json(signals);
  })
});


//Managing theme routes
router.route('/theme')
//The request must have titre and desc
.post(function(req, res){
  let theme  = req.body;
  database.addTheme(theme);
})

.get(function(req, res){
  database.getAllThem0es(function(themes){
    res.json(themes);
  })
});

router.route('/theme/:themeID')

.get(function(req, res){
  database.getTheme(req.params.themeID, function(theme){
    res.json(theme);
  })
})
// The request must have titre and contenu
.put(function(req, res){
  let theme = req.body;
  theme.id=req.params.themeID;
  database.updateTheme(theme);
});



//Managing votes routes

router.route('/vote')
.post(function(req, res){
  database.addVote(req.body.user, req.body.publication);
})

router.route('/votes/:userID')
.get(function(req, res){
  database.getUserVotes(req.params.userID, function(votes){
    res.json(votes);
  })
})

.delete(function(req, res){
  database.deleteVote(req.params.userID, req.body.publication);
})



app.use('/', router);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.send(err);
});

module.exports = app;