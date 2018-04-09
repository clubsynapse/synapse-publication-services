/**
 * @file Database access functions
 * @author MZ
 */
 var fs = require("fs");
 var mysql = require("mysql");
 var  database ={};

 var data = fs.readFileSync('database/config.json')
 var config = JSON.parse(data);
 var con = mysql.createConnection(config);
 con.connect(function(err){
     if(err) throw err;
     console.log("Database connected");
 })

 /**
  * Execute a sql query
  @function DoQuery
  @param {string} sql - The query to execute.
  @param {requestCallback} next - Function to execute after query, take result as parameter.
  */
   doQuery=function(sql, next){
        con.query(sql, function (err, result) {
            if (err) console.log(err);
            if(next)
                next(result);
        });
  }

  /**
   * Add a theme to database
   * @function AddTheme
   @param {string} title - Title of the theme
   @param {string} desc - Description of the theme
   @param {requestCallback} next - Function to execute after adding theme, take result as parameter
   */
  database.addTheme=function(title, desc, next){
      let sql = "insert into theme(title, description) values ("
      +" '"+title+"'"
      +", \""+desc+"\""
      +")";
      doQuery(sql, next);
  }

/**
  * Add a theme to a publication
  * @function AddPublicationTheme
  * @param {string} pubID - ID of publication
  * @param {string} theme - ID of theme to remove from publication
  * @param {requestCallback} next - Function to execute after adding theme to publication, take result as parameter
  */
 database.addPublicationTheme=function(pubID, theme, next){
    let sql = " insert into theme_publication(theme, publication) values ("
    +theme
    +", '"+pubID+"'"
    +")";
    doQuery(sql, next);
}


  /**
   * Add a publication to the database
   * @function AddPublication
   @param {string} id - ID of the publication
   @param {string } title - Title of the publication
   @param {string} user - ID of the user who commented
   @param {string} content - Content of the publication
   @param {string} themes - IDs of the themes related to publication seperated by ','
   @param {requestCallback} next- Function to execute after adding publication, take result as sparameter
   */
 database.addPublication=function(id, title, user, content, themes, next){     
     let sql = "insert into publication(id, title, user, content, active, date, time) values ("+
        "'"+id+"',"+
        "\""+title+"\","+
        "'"+user+"',"+
        "\""+content+"\","+
        "true,now(),now()"+
     ")";
     con.query(sql, function (err, result) {
        if (err) throw err;
        next(result);
        let n=themes.length || 0;
        if(n>0){
            for(var i=0;i<n;i++){
                let sqltheme = "insert into theme_publication(theme, publication) values ("
                +themes[i]
                +", '"+id+"'"
                +")";
                doQuery(sqltheme);
            }
        }
        return result;
    });
 }

 /**
  * Add a comment to the database
  @function AddComment
  @param {string} content - Content of comment
  @param {string} user - ID of user who commented
  @param {string} pubID - ID of the commented publication
  @param {requestCallback} next - Function to execute after adding comment, take result as parameter
  */
 database.addComment=function(content, user, pubID, next){
    let sql = "insert into comment(user, content, publication, date, time) values ("+
        ""+user+","+
        " \""+content+"\","+
        " '"+pubID+"',"+
        " now(), now()"+
    ")";
    doQuery(sql, next);
 }

 /**
  * Add a vote form an user for a publication to database
  @function AddVote
  @param {string} user - ID of the user
  @param {string} pubID - ID of the publication
  @param {requestCallback} next - Function to execute after adding vote, take result as parameter
  */
 database.addVote=function(user, pubID, next){
    let sql = "insert into vote(user, publication) values ("+
        ""+user+","+
        "'"+pubID+"'"+
    ")";
    doQuery(sql, next);
 }
 
 /**
  * Add observation to database
  @function AddObservation
  @param {string} user - ID of the user
  @param {string} pubID - ID of the publication
  @param {string} content - Content of the observation
  @param {requestCallback} next - Function to execute after adding observation, take result as parameter
  */
 database.addObservation=function(user, pubID,content, next){
    let sql = "insert into observation(user, publication, content) values ("+
        ""+user+","+
        "'"+pubID+"',"+
        "\""+content+"\""
    +")";
    doQuery(sql, next);
 }
 
 /**
  * Add a publication report to db
  @function AddReport
  @param {string} user - ID of the user
  @param {string} pubID - ID of the publication
  @param {string} content - Motive of the report
  @param {requestCallback} next - Function to execute after adding report, take result as parameter
  */
 database.addReport=function(user, pubID,content, next){
    let sql = "insert into report(user, publication, description) values ("+
        ""+user+","+
        " '"+pubID+"',"+
        "\""+content+"\""
    +")";
    doQuery(sql, next);
 }

 /**
  * Update a theme on DB
  @function UpdateTheme
   @param {string} id - ID of the theme
   @param {string} title - Title of the theme
   @param {string} desc - Description of the theme
  @param {requestCallback} next - Function to execute after updating, take result as parameter
  */
 database.updateTheme=function(id, title, desc, next){
     let sql = "update theme set "
     +"title=\""+title+"\""
     +", description=\""+desc+"\""
     +" where id = "+id;
     doQuery(sql, next);
 }
/**
 * Update publication title and content in DB
 * @function UpdatePublicationContent
   @param {string} id - ID of the publication
   @param {string } title - Title of the publication
   @param {string} content - Content of the publication
 @param {requestCallback} next - Function to execute after updating oublication
 */
 database.updatePublicationContent=function(id, title, content, next){
     let sql = "update publication set "
     +"title = \""+title+"\""
     +", content = \""+content+"\""
     +" where id = '"+id+"'";
     doQuery(sql, next);
 }

 /**
  * Set publication active or inactive on db
  @function UpdatePublicationState
  @param {string} pubID - ID of the pblication
  @param {boolean} active - Active or Inactive state
  @param {next} next - Function to execute after update, take result as parameter
  */
 database.updatePublicationState=function(pubID, active, next){
    let sql = "update publication set "
    +" active = "+active+""
    +" where id = '"+pubID+"'";
    doQuery(sql, next);
 }

 /**
  * Update a comment
  @function UpdateComment
  * @param {string} id - ID of comment
  * @param {string} content - Content of comment
  * @param {string} pubID - ID of Publication
  * @param {requestCallback} next - Function to execute after updating comment, take result as parameter
  */
 database.UpdateComment=function(id, content, pubID, next){
     let sql = "update comment set "
     +" content = \""+content+"\""
     +" where id = "+id
     +" and publication = '"+pubID+"'";
     doQuery(sql, next);
 }

 /**
  * Delete a theme from a publication
  * @function DeletePublicationTheme
  * @param {string} pubID - ID of publication
  * @param {string} theme - ID of theme to remove from publication
  * @param {requestCallback} next - Function to execute after deleting theme from publication, take result as parameter
  */
 database.deletePublicationTheme=function(pubID, theme, next){
     let sql = " delete from theme_publication"
     +" where theme = "+theme
     +" and publication='"+pubID+"'";
     doQuery(sql, next);
 }

 /**
  * Delete a comment
  @function DeleteComment
  * @param {string} comID - ID of Comment
  * @param {requestCallback} next - Function to execute after deleting comment, take result as parameter
  */
 database.deleteComment=function(comID, next){
     let sql = "delete from comment "
     +" where id = "+comID;
     doQuery(sql, next);
 }

/**
 * Remove an user vote from database
 * @function DeleteVote
 @param {string} user - ID of the user
 @param {string} pubID - ID of publication
 @param {requestCallback} next - Function to execute after deletion, take result as parameter
 */
 database.deleteVote=function(user, pubID, next){
     let sql = "delete from vote where "
     +" user='"+user+"'"
     +" and publication='"+pubID+"'";
     doQuery(sql, next);
 }


 /**
  * Get all votes from a user
  @function GetUserVotes
  @param {string} user - ID of the user
  @param {requestCallback} next - Function to execute after getting votes, take result as parameter
  @return {object[]} List of objects with user and publication attributes (id of user and publication)
  */
 database.getUserVotes=function(user, next){
     let sql = "select * from vote where user ='"+user+"'";
     doQuery(sql,next);
 }

 /**
  * Get all votes for a publication
  @function GetPublicationVotes
  @param {string} pubID - ID of publication
  @param {requestCallback} next - Function to execute after getting votes, take result as parameter
  @return {object[]} List of vote objects with user and publication attributes (id of user and publication)
  */
 database.getPublicationVotes=function(pubID, next){
    let sql = "select * from vote where publication ='"+pubID+"'";
    doQuery(sql,next);
}

/**
 * Get all publications
 * @function GetAllPublications
 * @param {string} typePub - Type of publication (P for publication or F for forum)
 * @param {string} keyword - Keyword to search in publication title and content
 @param {requestCallback} next - Function to execute after getting publications, take result as parameter
 @return {object[]} List of publication objects with id, title, content, active, date, time, user, themes(array of object with id and title), nbVotes, nbReports, nbComments
 */
 database.getAllPublications=function(typePub, keyword, next){
    let sql = "select * from publication"
    + " where id like '"+typePub+"%'"    
    +" and active=true";
    +" and (upper(title) like upper('%"+keyword+"%') or upper(content) like upper('%"+keyword+"%'))"
    +" order by date desc "
    +", time desc";
    doQuery(sql, function(res){
        let pubs = res;
        for (let i = 0; i < pubs.length; i++) {

            let sqltheme = "select theme.id, theme.title"
            +" from theme join theme_publication"
            +" on theme.id=theme_publication.theme"
            +" where theme_publication.publication='"+pubs[i].id+"'";
            let sqlvote = "select * "
            +" from vote" 
            +" where publication ='"+pubs[i].id+"'"
            
            doQuery(sqltheme, function(restheme){
                pubs[i].themes=restheme;
                doQuery(sqlvote, function(resvote){
                    pubs[i].nbVotes = resvote.length; 
                    database.getReports(pubs[i].id, function(resreport){
                        pubs[i].nbReports = resreport.length;
                        database.getComments(pubs[i].id, function(rescom){
                            pubs[i].nbComments = rescom.length;                            
                                if(i==pubs.length-1)
                                    next(pubs);
                        });
                    });
                });
            });            
        }
        if(pubs.length==0)
            next(pubs);
    });
 }

 /**
 * Get all publications of a specific theme
 * @function GetThemePublications 
 * @param {string} typePub - Type of publication (P for publication or F for forum)
 * @param {string} keyword - Keyword to search in publication title and content
 * @param {string} theme - id of Theme
 * @param {requestCallback} next - Function to execute after getting publications, take result as parameter
 * @return {object[]} List of publication objects with id, title, content, active, date, time, user, themes(array of object with id and title), nbVote, nbReports, nbComments
 */
database.getThemePublications=function(typePub, keyword, theme, next){
    let sql = "select publication.id as id, publication.title as title, content, active, date, time, user"
    +" from publication join theme_publication"
    +" on publication.id=theme_publication.publication"
    + " where id like '"+typePub+"%'"
    +" and active=1"
    +" and theme_publication.theme = "+theme
    +" and (upper(title) like upper('%"+keyword+"%') or upper(content) like upper('%"+keyword+"%'))"
    +" order by date desc "
    +", time desc";
    doQuery(sql, function(res){
        let pubs = res;
        for (let i = 0; i < pubs.length; i++) {

            let sqltheme = "select theme.id as id, theme.title as title"
            +" from theme join theme_publication"
            +" on theme.id=theme_publication.theme"
            +" where theme_publication.publication='"+pubs[i].id+"'";
            let sqlvote = "select * "
            +" from vote" 
            +" where publication ='"+pubs[i].id+"'"
            +" and active=true";
            
            doQuery(sqltheme, function(restheme){
                pubs[i].themes=restheme;
                doQuery(sqlvote, function(resvote){
                    pubs[i].nbVotes = resvote.length; 
                    database.getReports(pubs[i].id, function(resreport){
                        pubs[i].nbReports = resreport.length;
                        database.getComments(pubs[i].id, function(rescom){
                            pubs[i].nbComments = rescom.length;                            
                                if(i==pubs.length-1)
                                    next(pubs);
                        });
                    });
                });
            });            
        }
        if(pubs.length==0)
            next(pubs);
    });
 }

 /**
  * Get a publication with id
  @function GetPublication
  @param {string} id - ID of publication
  @param {requestCallback} next - Function to execute after getting publication, take result as parameter
  @return {object[]} Publication object with id, title, content, active, date, time, user, themes(array of object with id and title), nbVote, nbReports, nbComments or null if not found
  */
 database.getPublication=function(id, next){
    let sql = "select * from publication where id ='"+id+"'";
    doQuery(sql, function(res){
        if(res.length==1){
            let pubs = res[0];

            let sqltheme = "select theme.id, theme.title"
            +" from theme join theme_publication"
            +" on theme.id=theme_publication.theme"
            +" where theme_publication.publication='"+pubs.id+"'";
            let sqlvote = "select * "
            +" from vote" 
            +" where publication ='"+pubs.id+"'";

            doQuery(sqltheme, function(restheme){
                pubs.themes=restheme;
                doQuery(sqlvote, function(resvote){
                    pubs.nbVotes = resvote.length; 
                    database.getReports(pubs.id, function(resreport){
                        pubs.nbReports = resreport.length;
                        database.getComments(pubs.id, function(rescom){
                            pubs.nbComments = rescom.length;
                                    next(pubs);
                        });
                    });
                });
            });                    
        }else
            next(null);
    });
 }

 /**
  * Get all themes from database
  @function GetAllThemes
  @param {requestCallback} next - Function to execute after getting themes, take result as parameter
  @return {object[]} List of theme objects with id, title and description
  */
 database.getAllThemes=function(next){
    let sql = "select * from theme";
    doQuery(sql, next);
 }

 /**
  * Get theme with id
  @function GetTheme
  @param {string} id - ID of the theme
  @param {requestCallback} next - Function to execute after getting theme, take result as parameter
  @return {object[]} Theme object with id, title and description or null if not found
  */
 database.getTheme=function(id, next){
    let sql = "select * from theme where id='"+id+"'";
    doQuery(sql, function(res){
        if(res.length==1)
            next(res[0]);
        else
            next(null);
    });
 }

 /**
  * Get comments of a publication with publication ID
  @function GetComments
  @param {string} pubID - ID of the publication 
  @param {requestCallback} next - Function to execute after getting comments, take result as parameter
  @return {object[]} List of comment objects with id, content, date as date, time, user attributes
  */
 database.getComments=function(pubID, next){
    let sql = "select id, content, date as date, time, user"
    +" from comment"
    +" where publication ='"+pubID+"'"
    +" order by date desc "
    +", time desc";
    doQuery(sql, function(res){
            next(res);
    });
 }

 /**
  * Get comment from database
  * @function getComment
  * @param {string} id ID of comment
  * @param {requestCallback} next Function to execute after getting comment, take result as parameter
  * @return {object} Comment object with id, content, date as date, time, user attributes
  */
 database.getComment=function(id, next){
    let sql = "select id, content, date, time, user"
    +" from comment"
    +" where id ='"+id+"'"
    doQuery(sql, function(res){
        if(res.length==1)
            next(res[0]);
        else
            next(null);
    });
 }

 /**
  * Get number of publication
  @function GetPublicationsNumber
  @param {requestCallback} next - Function to execute after getting publication number, take result as parameter
  @return {number} Number of publications in database
  */
 database.getPublicationsNumber=function(next){
     let sql = "select * from publication";
     doQuery(sql, function(res){
         next(res.length);
     })
 }

 /**
  * Get observations with publication id
  @function GetObservations
  @param {string} pubID - ID of publication
  @param {requestCallback} next - Function to execute after getting observations, take result as parameter
  @return {object[]} List of observation objects with user and content attributes
  */
 database.getObservations=function(pubID, next){
    let sql = "select user, content from observation where publication = '"+pubID+"'";
    doQuery(sql, next);
 }

 /**
  * Verify if a user voted for a publication
  * @function getVote
  * @param {string} userID - ID of the user
  * @param {string} pubID - ID of publication
  * @param {requestCallback} next - Function to execute after verification, take result as parameter
  * @return {boolean} True if vote is present and else if not
  */
 database.getVote=function(userID, pubID, next){
     let sql = "select * from vote"
     +" where user = "+userID
     +" and publication = '"+pubID+"'";
     doQuery(sql,function(result){
         if(result.length==1)
            next(true);
         else
            next(false);
     });
 }

 /**
  * Get reports of a publication
  @function GetReports
  @param {string} pubID - ID of publication
  @param {requestCallback} next - Function to execute after getting reports, take result as parameter
  @return {object[]} List of reports object with user and description attributes
  */
 database.getReports=function(pubID, next){
    let sql = "select user, description from report where publication = '"+pubID+"'";
    doQuery(sql, next);
 }

 module.exports = database; 