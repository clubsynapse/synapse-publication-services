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
  * Execute a query
  @param {string} sql - The query to execute
  */
   doQery=function(sql, next){
        con.query(sql, function (err, result) {
            if (err) throw err;
            next(result);
        });
  }

  /**
   * function used to add a theme to database
   */
  database.addTheme=function(t, next){
      let sql = "insert into theme values ("
      +t.id
      +", '"+t.titre+"'"
      +", '"+t.desc+"'"
      +")";
      doQery(sql, next);
  }

  /**
   * function used to add a publication to the database
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
                doQery(sqltheme);
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
                doQery(sqlfile);
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
                doQery(sqlform);
            }
        }
        return result;
    });
 }

 /**
  * function used to add a comment to the database"
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
                doQery(sql);
            }
        }
        return result;
    });
 }

 /**
  * function used to add a vote form an user to database
  */
 database.addVote=function(userID, pubID, next){
    let sql = "insert into vote(userID, publication) values ("+
        "'"+userID+"',"+
        "'"+pubID+"'"+
    ")";
    doQery(sql, next);
 }
 
 /**
  * function used to add remarque to database
  */
 database.addRemarque=function(userID, pubID,contenu, next){
    let sql = "insert into remarque(userID, publication, contenu) values ("+
        "'"+userID+"',"+
        "'"+pubID+"',"+
        "'"+contenu+"'"
    ")";
    doQery(sql, next);
 }
 
 /**
  * function used to add a publication signalment to db
  */
 database.addSignalment=function(userID, pubID,contenu, next){
    let sql = "insert into (userID, publication, raison) values ("+
        "'"+userID+"',"+
        "'"+pubID+"',"+
        "'"+contenu+"'"
    ")";
    doQery(sql, next);
 }

 /**
  * function used to update a theme on DB
  */
 database.updateTheme=function(t, next){
     let sql = "update theme set "
     +"title='"+t.titre+"'"
     +", description='"+t.desc+"'"
     +" where id = "+t.id;
     doQery(sql, next);
 }
/**
 * function used to update publication title and content in DB
 */
 database.updatePublicationContent=function(p, next){
     let sql = "update publication set "
     +"titre = '"+p.titre+"'"
     +", contenu = "+p.contenu+"'"
     +" where id = '"+p.id+"'";
     doQery(sql, next);
 }

 /**
  * function used to set publication active or inactive on db
  */
 database.updatePublicationState=function(pubID, active, next){
    let sql = "update publication set "
    +" active = '"+active+"'"
    +" where id = '"+pubID+"'";
    doQery(sql, next);
 }
/**
 * function used to remove an user vote from database
 * @param {*ID of the user} userID 
 * @param {*ID of publication} pubID 
 */
 database.deleteVote=function(userID, pubID, next){
     let sql = "delete from vote where "
     +" userID='"+userID+"'"
     +" and publication='"+pubID+"'";
     doQery(sql, next);
 }

 database.getUserVotes=function(userID, next){
     let sql = "select * from vote where userID ='"+userID+"'";
     doQery(sql,next);
 }

 database.getAllPublications=function(next){
    let sql = "select * from publication";
    doQery(sql, function(res){
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

            doQery(sqltheme, function(restheme){
                pubs[i].themes=restheme;
                doQery(sqlvote, function(resvote){
                    pubs[i].nbVote = resvote.length; 
                    database.getSignalements(pubs[i].id, function(ressignal){
                        pubs[i].nbSignals = ressignal.length;
                        database.getCommentaires(pubs[i].id, function(rescom){
                            pubs[i].nbComments = rescom.length;
                            doQery(sqlform, function(resform){
                                pubs[i].forms = resform;
                                doQery(sqlfic, function(resfic){
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


 database.getPublication=function(id, next){
    let sql = "select * from publication where id ='"+id+"'";
    doQery(sql, function(res){
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

            doQery(sqltheme, function(restheme){
                pubs.themes=restheme;
                doQery(sqlvote, function(resvote){
                    pubs.nbVote = resvote.length; 
                    database.getSignalements(pubs.id, function(ressignal){
                        pubs.nbSignals = ressignal.length;
                        database.getCommentaires(pubs.id, function(rescom){
                            pubs.nbComments = rescom.length;
                            doQery(sqlform, function(resform){
                                pubs.forms = resform;
                                doQery(sqlfic, function(resfic){
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

 database.getAllThemes=function(next){
    let sql = "select * from theme";
    doQery(sql, next);
 }

 database.getTheme=function(id, next){
    let sql = "select * from theme where id='"+id+"'";
    doQery(sql, function(res){
        if(res.length==1)
            next(res[0]);
        else
            next(false);
    });
 }

 database.getCommentaires=function(pubID, next){
    let sql = "select id, contenu, datepub as date, heure, auteur"
    +" from commentaire"
    +" where publication ='"+pubID+"'";
    doQery(sql, function(res){
        let coms = res;
        for(let i=0; i<coms.length; i++){
            sqlfic = "select id, titre, url, typefichier as type"
            +" from fichier_commentaire"
            +" where fichier_commentaire.publication = '"+pubID+"'"
            "       and fichier_commentaire.commentaire="+coms[i].id;
            doQery(sqlfic, function(resfile){
                coms[i].files = resfile;
                if(i==coms.length-1)
                    next(coms);
            })
        }
        if(coms.length==0)
            next(coms);
    });
 }

 database.getPublicationsNumber=function(next){
     let sql = "select * from publication";
     doQery(sql, function(res){
         next(res.length);
     })
 }

 database.getRemarques=function(pubID, next){
    let sql = "select auteur, contenu from remarque where publication = '"+pubID+"'";
    doQery(sql, next);
 }

 database.getSignalements=function(pubID, next){
    let sql = "select userID, raison from signalement where publication = '"+pubID+"'";
    doQery(sql, next);
 }

 module.exports = database; 