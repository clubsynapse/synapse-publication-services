/**
 * @author MZ
 * @description Files managinig relations with database
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
  @param {string} sql - The query to execute
  @param {requestCallback} next - Function to execute after query, take result as parameter
  */
   doQuery=function(sql, next){
        con.query(sql, function (err, result) {
            if (err) throw err;
            next(result);
        });
  }

  /**
   * Add a theme to database
   * @param {Object} t - Theme object with id, titre and desc
   * @param {requestCallback} next - Function to execute after adding theme, take result as parameter
   */
  database.addTheme=function(t, next){
      let sql = "insert into theme values ("
      +t.id
      +", '"+t.titre+"'"
      +", '"+t.desc+"'"
      +")";
      doQuery(sql, next);
  }

  /**
   * Add a publication to the database
   * @param {Object} p - Publication object with id, titre, auteur, contenu, forms and files attributes
   */
 database.addPublication=function(p){
     let sql = "insert into publication(id, titre, auteur, contenu, active, datepub, heure) values ("+
        "'"+p.id+"',"+
        "'"+p.titre+"',"+
        "'"+p.auteur+"',"+
        "'"+p.contenu+"',"+
        "true,now(),now()"+
     ")";
     con.query(sql, function (err, result) {
        if (err) throw err;
        if(p.themes.length>0){
            let n=p.themes.length;
            for(var i=0;i<n;i++){
                let sqltheme = "insert into theme_publication values ("
                +p.themes[i]
                +", '"+p.id+"'"
                +")";
                doQuery(sqltheme);
            }
        }
        if(p.files.length>0){
            let n=p.files.length;
            for(var i=0;i<n;i++){
                let sqlfile = "insert into fichier_publication values ("
                +(i+1)
                +", '"+p.files[i].titre+"'"
                +", '"+p.files[i].url+"'"
                +", '"+p.files[i].type+"'"
                +", '"+p.id+"'"
                +")";
                doQuery(sqlfile);
            }
        }
        if(p.forms.length>0){
            let n=p.files.length;
            for(var i=0;i<n;i++){
                let sqlform = "insert into formulaire values ("
                +(i+1)
                +", '"+p.forms[i].titre+"'"
                +", '"+p.forms[i].url+"'"
                +", '"+p.id+"'"
                +")";
                doQuery(sqlform);
            }
        }
        return result;
    });
 }

 /**
  * Add a comment to the database
  * @param {string} pubID - ID of the commented publication
  * @param {Object} c - Comment object with id, auteur, contenu and files
  */
 database.addComment=function(pubID,c){
    let sql = "insert into commentaire(id, auteur, contenu, publication, datepub, heure) values ("+
        "'"+c.id+"',"+
        "'"+c.auteur+"',"+
        "'"+c.contenu+"',"+
        "'"+pubID+"',"
        "now(),now()"+
    ")";
    con.query(sql, function (err, result) {
        if (err) throw err;
        if(c.files.length>0){
            let n=c.files.length;
            for(var i=0;i<n;i++){
                let sqlfile = "insert into fichier_commentaire values ("
                +(i+1)
                +", '"+c.files[i].titre+"'"
                +", '"+c.files[i].url+"'"
                +", '"+c.files[i].type+"'"
                +", '"+pubID+"'"
                +", '"+c.id+"'"
                +")";
                doQuery(sql);
            }
        }
        return result;
    });
 }

 /**
  * Add a vote form an user for a publication to database
  * @param {string} userID - ID of the user
  * @param {string} pubID - ID of the publication
  * @param {requestCallback} next - Function to execute after adding vote, take result as parameter
  */
 database.addVote=function(userID, pubID, next){
    let sql = "insert into vote(userID, publication) values ("+
        "'"+userID+"',"+
        "'"+pubID+"'"+
    ")";
    doQuery(sql, next);
 }
 
 /**
  * Add remarque to database
  * @param {string} userID - ID of the user
  * @param {string} pubID - ID of the publication
  * @param {string} contenu - Content of the remarque
  * @param {requestCallback} next - Function to execute after adding remarque, take result as parameter
  */
 database.addRemarque=function(userID, pubID,contenu, next){
    let sql = "insert into remarque(userID, publication, contenu) values ("+
        "'"+userID+"',"+
        "'"+pubID+"',"+
        "'"+contenu+"'"
    ")";
    doQuery(sql, next);
 }
 
 /**
  * Add a publication signalment to db
  * @param {string} userID - ID of the user
  * @param {string} pubID - ID of the publication
  * @param {string} contenu - Motive of the remarque
  * @param {requestCallback} next - Function to execute after adding signalment, take result as parameter
  */
 database.addSignalment=function(userID, pubID,contenu, next){
    let sql = "insert into (userID, publication, raison) values ("+
        "'"+userID+"',"+
        "'"+pubID+"',"+
        "'"+contenu+"'"
    ")";
    doQuery(sql, next);
 }

 /**
  * Update a theme on DB
  * @param {Object} t - Theme object with id, titre and desc
  * @param {requestCallback} next - Function to execute after updating, take result as parameter
  */
 database.updateTheme=function(t, next){
     let sql = "update theme set "
     +"title='"+t.titre+"'"
     +", description='"+t.desc+"'"
     +" where id = "+t.id;
     doQuery(sql, next);
 }
/**
 * Update publication title and content in DB
 * @param {Object} p - Publication object with titre, contenu and id
 * @param {requestCallback} next - Function to execute after updating oublication
 */
 database.updatePublicationContent=function(p, next){
     let sql = "update publication set "
     +"titre = '"+p.titre+"'"
     +", contenu = "+p.contenu+"'"
     +" where id = '"+p.id+"'";
     doQuery(sql, next);
 }

 /**
  * Set publication active or inactive on db
  * @param {string} pubID - ID of the pblication
  * @param {boolean} active - Active or Inactive state
  * @param {next} next - Function to execute after update, take result as parameter
  */
 database.updatePublicationState=function(pubID, active, next){
    let sql = "update publication set "
    +" active = '"+active+"'"
    +" where id = '"+pubID+"'";
    doQuery(sql, next);
 }
/**
 * Remove an user vote from database
 * @param {string} userID - ID of the user
 * @param {string} pubID - ID of publication
 * @param {requestCallback} next - Function to execute after deletion, take result as parameter
 */
 database.deleteVote=function(userID, pubID, next){
     let sql = "delete from vote where "
     +" userID='"+userID+"'"
     +" and publication='"+pubID+"'";
     doQuery(sql, next);
 }

 /**
  * Get all votes from a user
  * @param {string} userID - ID of the user
  * @param {requestCallback} next - Function to execute after getting votes, take result as parameter
  */
 database.getUserVotes=function(userID, next){
     let sql = "select * from vote where userID ='"+userID+"'";
     doQuery(sql,next);
 }

 /**
  * Get all votes for a publication
  * @param {string} pubID - ID of publication
  * @param {requestCallback} next - Function to execute after getting votes, take result as parameter
  */
 database.getPublicationVotes=function(pubID, next){
    let sql = "select * from vote where publication ='"+pubID+"'";
    doQuery(sql,next);
}

/**
 * Get all publications
 * @param {requestCallback} next - Function to execute after getting publications, take result as parameter
 */
 database.getAllPublications=function(next){
    let sql = "select * from publication";
    doQuery(sql, function(res){
        let pubs = res;
        for (let i = 0; i < pubs.length; i++) {

            let sqltheme = "select theme.id, theme.titre, theme.description"
            +" from theme join theme_publication"
            +" on theme.id=theme_publication.theme"
            +" where theme_publication.publication='"+pubs[i].id+"'";
            let sqlvote = "select * as nbvote"
            +" from vote" 
            +" where publication ='"+pubs[i].id+"'";
            let sqlfic = "select id, titre, url, typefichier as type"
            +" from fichier_publication"
            +" where publication ='"+pubs[i].id+"'";
            let sqlform = "select id, titre, url"
            +" from formulaire"
            +" where publication ='"+pubs[i].id+"'";

            doQuery(sqltheme, function(restheme){
                pubs[i].themes=restheme;
                doQuery(sqlvote, function(resvote){
                    pubs[i].nbVote = resvote.length; 
                    database.getSignalements(pubs[i].id, function(ressignal){
                        pubs[i].nbSignals = ressignal.length;
                        database.getCommentaires(pubs[i].id, function(rescom){
                            pubs[i].nbComments = rescom.length;
                            doQuery(sqlform, function(resform){
                                pubs[i].forms = resform;
                                doQuery(sqlfic, function(resfic){
                                    pubs[i].files = resfic;
                                        if(i==pubs.length-1)
                                        next(pubs);
                                });
                            });
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
  * @param {string} id - ID of publication
  * @param {requestCallback} next - Function to execute after getting publication, take result as parameter
  */
 database.getPublication=function(id, next){
    let sql = "select * from publication where id ='"+id+"'";
    doQuery(sql, function(res){
        if(res.length==1){
            let pubs = res[0];

            let sqltheme = "select theme.id, theme.titre, theme.description"
            +" from theme join theme_publication"
            +" on theme.id=theme_publication.theme"
            +" where theme_publication.publication='"+pubs.id+"'";
            let sqlvote = "select * as nbvote"
            +" from vote" 
            +" where publication ='"+pubs.id+"'";
            let sqlfic = "select id, titre, url, typefichier as type"
            +" from fichier_publication"
            +" where publication ='"+pubs.id+"'";
            let sqlform = "select id, titre, url"
            +" from formulaire"
            +" where publication ='"+pubs.id+"'";

            doQuery(sqltheme, function(restheme){
                pubs.themes=restheme;
                doQuery(sqlvote, function(resvote){
                    pubs.nbVote = resvote.length; 
                    database.getSignalements(pubs.id, function(ressignal){
                        pubs.nbSignals = ressignal.length;
                        database.getCommentaires(pubs.id, function(rescom){
                            pubs.nbComments = rescom.length;
                            doQuery(sqlform, function(resform){
                                pubs.forms = resform;
                                doQuery(sqlfic, function(resfic){
                                    pubs.files = resfic;
                                    next(pubs);
                                });
                            });
                        });
                    });
                });
            });                    
        }else
            return false;
    });
 }

 /**
  * Get all themes from database
  * @param {requestCallback} next - Function to execute after getting themes, take result as parameter
  */
 database.getAllThemes=function(next){
    let sql = "select * from theme";
    doQuery(sql, next);
 }

 /**
  * Get theme with id
  * @param {string} id - ID of the theme
  * @param {requestCallback} next - Function to execute after getting theme, take result as parameter
  */
 database.getTheme=function(id, next){
    let sql = "select * from theme where id='"+id+"'";
    doQuery(sql, function(res){
        if(res.length==1)
            next(res[0]);
        else
            next(false);
    });
 }

 /**
  * Get commentaires of a publication with publication ID
  * @param {string} pubID - ID of the publication 
  * @param {requestCallback} next - Function to execute after getting commentaires, take result as parameter
  */
 database.getCommentaires=function(pubID, next){
    let sql = "select id, contenu, datepub as date, heure, auteur"
    +" from commentaire"
    +" where publication ='"+pubID+"'";
    doQuery(sql, function(res){
        let coms = res;
        for(let i=0; i<coms.length; i++){
            sqlfic = "select id, titre, url, typefichier as type"
            +" from fichier_commentaire"
            +" where fichier_commentaire.publication = '"+pubID+"'"
            "       and fichier_commentaire.commentaire="+coms[i].id;
            doQuery(sqlfic, function(resfile){
                coms[i].files = resfile;
                if(i==coms.length-1)
                    next(coms);
            })
        }
        if(coms.length==0)
            next(coms);
    });
 }

 /**
  * Get number of publication
  * @param {requestCallback} next - Function to execute after getting publication number, take result as parameter
  */
 database.getPublicationsNumber=function(next){
     let sql = "select * from publication";
     doQuery(sql, function(res){
         next(res.length);
     })
 }

 /**
  * Get remarques with publication id
  * @param {string} pubID - ID of publication
  * @param {requestCallback} next - Function to execute after getting remarques, take result as parameter
  */
 database.getRemarques=function(pubID, next){
    let sql = "select auteur, contenu from remarque where publication = '"+pubID+"'";
    doQuery(sql, next);
 }

 /**
  * Get signalment of a publication
  * @param {string} pubID - ID of publication
  * @param {requestCallback} next - Function to execute after getting signalments, take result as parameter
  */
 database.getSignalements=function(pubID, next){
    let sql = "select userID, raison from signalement where publication = '"+pubID+"'";
    doQuery(sql, next);
 }

 module.exports = database; 