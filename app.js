/**
 * @file Endpoints management
 * @author MZ
 */

var express = require('express');
var fs = require('fs');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var database = require('./database');

var app = express();

//Add bodyparser to server
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//Get configuration
var data = fs.readFileSync('config/appconf.json')
var appConfig = JSON.parse(data);

/**
 * Process query result for database modifications
 * @function QueryResult
 * @param {object} result - Result object of the query
 * @param {object} res - Http response object
 */
queryResult=function(result, res){
  if(result.affectedRows!=0){
    res.json({success : true, message : result.message})
  }else{
    res.json({success : false, message : result.message})
  }
}

//router of the server
var router = express.Router();

//Token verifications
router.use(function(req, res, next){
  //get token from request
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if(token){
    jwt.verify(token, appConfig.JWTSecret, function(err, decoded){
      if(err){
        return res.json({success : false, message : "token authentification failed"});
      }else{
        req.user={};
        req.user.id = decoded.id || decoded.profile.id;
        req.user.type = decoded.type;
        console.log(req.body);
        next();
      }
    });
  }else{
    //no token
    return res.status(403).json({success : false, message : 'No token'});
  }
});

//Managing /publications and /forum requests

router.route('/publications')

//The post request must have titre, auteur, contenu, themes attributes
/**
 * Add new publication
 * @name Adding new publication
 * @path {POST} /publications
 * @body {string} title Title of publication
 * @body {string} content Content of publication
 * @body {string} themes Array containing IDs of publication theme 
 */
.post(function(req, res){
  let pub = req.body;
  var themes = pub.themes || [];
  if(themes!=[])
    themes = themes.split(',');
  database.getPublicationsNumber(function(nb){
    let nbr = 9-String(++nb).length; 
    let id = "P"+"0".repeat(nbr)+nb;
    database.addPublication(id, pub.title, req.user.id, pub.content, themes, function(result){
      queryResult(result, res);
    });
  });
})

/**
 * Get all publications (with optional theme and keyword parameter)
 * @name Getting all publications
 * @path {string} /publications
 * @query {string} theme ID of theme related to publications(optional)
 * @query {string} keyword Keyword to search in publication(optional)
 * @body {string} theme ID of theme related to publications(optional)
 * @body {string} keyword Keyword to search in publication(optional
 */
.get(function(req, res){
  //console.log(req);
  let type = "P";
  let keyword = req.query.keyword || req.body.keyword || "";
  let theme = req.query.theme || req.body.thme;
  if(theme){
    database.getThemePublications(type, keyword, theme, function(result){
      res.json(result);
    })
  }else{
    database.getAllPublications(type, keyword, function(result){
      res.json(result);
    })
  }
});

router.route('/forum')

//The post request must have titre, auteur, contenu, themes, files, and forms attributes
.post(function(req, res){
  let pub = req.body;
  database.getPublicationsNumber(function(nb){
    let nbr = 9-String(++nb).length; 
    pub.id = "F"+"0".repeat(nbr)+nb;
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
/**
 * Get a publication
 * @name Get a publication
 * @path {Get} /publications/:pubID
 * @params {string} pubID ID of publication
 */
.get(function(req, res){
  database.getPublication(req.params.pubID, function(pub){
    if(pub){
      res.json(pub);
    }else{
      res.status(404).json({success : faise, message : "Publication not fount"});
    }
  })
})

/**
 * Update a publication
 * @name Update publication
 * @path {PUT} /publications/:pubID
 * @params {string} pubID ID of publication
 * @body {string} title New title of publication
 * @body {string} content New content of publication
 */
.put(function(req, res){
  database.getPublication(req.params.pubID, function(pub){
    if(pub){
      if(pub.user==req.user.id){
        let newPub = req.body;
        if(newPub.title && newPub.content){
          database.updatePublicationContent(req.params.pubID, newPub.title, newPub.content, function(result){
            queryResult(result, res);
          });
        }else{
          res.json({success : faise, message : 'Publication title or content undefined'});
        }
      }else{
        res.status(403).json({success : false, message : 'Access not allowed'});
      }
    }else{
      res.status(404).json({success : faise, message : 'Publication not found'});
    }
  });
})
/**
 * Delete a publication
 * @name Delete publication
 * @path {DELETE} /publications/:pubID
 * @params {string} pubID ID of publication
 */
.delete(function(req, res){
  database.getPublication(req.params.pubID, function(pub){
    if(pub){
      if(pub.user==req.user.id || req.user.type=="admin"){
        database.updatePublicationState(req.params.pubID, false, function(result){
          queryResult(result, res);
        });   
      }else{
        res.status(403).json({success : false, message : 'Access not allowed'});
      }
    }else{
      res.status(404).json({success : faise, message : 'Publication not found'});
    }
  });
});

//Managing publication related routes

//Managing commentaires route
router.route('/publications/:pubID/comments')
/**
 * Add a comment to a publication
 * @name Add comment
 * @path {POST} /publications/:pubID/comments
 * @params {string} pubID ID of the publication
 * @body {string} content Content of the comment
 */
.post(function(req, res){
  let com = req.body.content;
    if(com){
      database.addComment(com, req.user.id, req.params.pubID, function(result){
        queryResult(result, res);
      });
    }else{
      res.json({success : false, message : 'Comment content undefined'});
    }
})
/**
 * Get all comments of a publication
 * @name Get commentq
 * @path {GET} /publications/:pubID/comments
 * @params {string} pubID ID of the publication
 */
.get(function(req, res){
  database.getComments(req.params.pubID, function(coms){
    res.json(coms);
  })
});

router.route('/publications/:pubID/comments/:comID')
/**
 * Update a comment
 * @name Uodate comment
 * @path {PUT} /publications/:pubID/comments/:comID
 * @params {string} pubID ID of the publication
 * @params {string} comID ID of the comment
 * @body {string} content Content of the comment
 */
.put(function(req, res){
  database.getComment(req.params.comID, function(com){
    if(com){
      if(com.user==req.user.id){
        if(req.body.content){
          database.UpdateComment(req.params.comID, req.body.content, req.params.pubID, function(result){
            queryResult(result, res);
          });
        }else{
          res.json({success : false, message : 'Comment content undefined'});
        }
      }else{
        res.status(403).json({success : false, message : 'Access not allowed'});
      }
    }else{
      res.status(404).json({success : false, message : 'Comment not found'});
    }
  })
})
/**
 * Delete a comment
 * @name Delete comment
 * @path {DELETE} /publications/:pubID/comments/:comID
 * @params {string} pubID ID of the publication
 * @params {string} comID ID of the comment
 */
.delete(function(req, res){
  database.getComment(req.params.comID, function(com){
    if(com){
      if(com.user==req.user.id || req.user.type=="admin"){
          database.deleteComment(req.params.comID, function(result){
            queryResult(result, res);
          });        
      }else{
        res.status(403).json({success : false, message : 'Access not allowed'});
      }
    }else{
      res.status(404).json({success : false, message : 'Comment not found'});
    }
  })
});



//Managing remarques route
router.route('/publications/:pubID/observations')
/**
 * Add an observation of a publication
 * @name Add observation to publication
 * @path {POST} /publications/:pubID/observations
 * @params {string} pubID ID of publication
 * @body {string} content Content of observation
 */
.post(function(req, res){
  database.addObservation(req.user.id, req.params.pubID, req.body.content, function(result){
    queryResult(result, res);
  });
})

/**
 * Get all observations of a publication
 * @name Get observations of publication
 * @path {POST} /publications/:pubID/observations
 * @params {string} pubID ID of publication
 */
.get(function(req, res){
  database.getRemarques(req.params.pubID, function(rems){
    res.json(rems);
  })
});


//Managing signalements route
router.route('/publications/:pubID/reports')
/**
 * Add a report of a publication
 * @name Add report of publication
 * @path {POST} /publications/:pubID/reports
 * @params {string} pubID ID of publication
 * @body {string} content Content of the report
 */
.post(function(req, res){
  database.addReport(req.user.id, req.params.pubID, req.body.content, function(result){
    queryResult(result, res);
  });
})
/**
 * Get reports of a publication
 * @name Get all reports of a publication
 * @path {GET} /publications/:pubID/reports
 * @params {string} pubID ID of publication
 */
.get(function(req, res){
  database.getReports(req.params.pubID, function(result){
    res.json(result);
  })
});


//Managing theme routes
router.route('/theme')
/**
 * Add new theme
 * @name Adding new theme
 * @path {POST} /theme
 * @body {string} title Title of the theme
 * @body {string} description Description of the theme
 */
.post(function(req, res){
  if(req.user.type=="admin"){
    let theme  = req.body;
    database.addTheme(theme.title, theme.description, function(result){
    queryResult(result, res);
  });
  }else{
    res.status(403).json({success : false, message : "Acces not allowed"});
  }
})

/**
 * Get all themes from database
 * @name Getting theme list
 * @path {GET} /theme
 * @response {object[]} List of theme objects with id, title and description
 */
.get(function(req, res){
  database.getAllThemes(function(themes){
    res.json(themes);
  })
});

router.route('/theme/:themeID')

.get(function(req, res){
  database.getTheme(req.params.themeID, function(theme){
    res.json(theme);
  })
})

/**
 * Update a theme
 * @name Updating theme
 * @path {PUT} /theme/:themeID
 * @body {string} title New title of theme
 * @body {string} description New description of theme
 */
.put(function(req, res){
  if(req.user.type=="admin"){
    let theme = req.body;
    if(theme.title && theme.description){
      database.updateTheme(req.params.themeID, theme.title, theme.description, function(result){
        queryResult(result, res);
      });
    }else{
      res.json({success : false, message : "Theme attribute not defined"});
    }
  }else{
    res.status(403).json({success : false, message : "Acces not allowed"});
  }
});



//Managing votes routes

router.route('/votes/:pubID')
/**
 * Add a vote for a publication
 * @name Add publication votes
 * @path {POST} /votes/:pubID
 * @params {string} pubID ID of the publication
 */
.post(function(req, res){
    database.addVote(req.user.id, req.params.pubID, function(result){
      queryResult(result, res);
    });
})

/**
 * Get all votes for a publication
 * @name Get publication votes
 * @path {GET} /votes/:pubID
 * @params {string} pubID ID of the publication
 */
.get(function(req, res){
  database.getPublicationVotes(req.params.pubID, function(result){
    res.json(result);
  })
})

/**
 * Delete a vote from a user for a publication
 * @name Deleting a vote
 * @path {DELETE} /votes/:pubID
 * @params {string} pubID ID of the publication
 */
.delete(function(req, res){
  database.deleteVote(req.user.id, req.params.pubID, function(result){
    queryResult(result, res);
  })
});


router.route('/votes')
/**
 * Get all vote of user
 * @name Get user votes
 * @path {GET} /votes
 */
.get(function(req, res){
  database.getUserVotes(req.user.id, function(votes){
    res.json(votes);
  })
});



app.use('/', router);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.send(err);
});

module.exports = app;