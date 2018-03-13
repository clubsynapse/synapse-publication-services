/**
 * @author MZ
 * @description Files managinig relations with datamase
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

 

 database.log=function(){
    console.log(config);
 } 

 module.exports = database;