"use strict";
const dbHandler = require('./dbhandler.js');


let init=_=> {
        dbHandler.execQuery('drop table if exists userinfo')
                 .then(_=>{
                    return dbHandler.execQuery(`create table userinfo (
                        name varchar(50),
                        gender varchar(20),
                        email varchar(50) primary key,
                        phoneno varchar(15),
                        yearofpassing varchar(30),
                        department varchar(50),
                        course varchar(50),
                        curcountry varchar(50),
                        curcity varchar(50),
                        curorg varchar(50),
                        curdesignation varchar(50)
                    )`);
                 })
                 .then(_=>{
                    return dbHandler.execQuery('drop table if exists userquery');
                 })
                 .then(_=>{
                    return  dbHandler.execQuery(`create table userquery (
                        name varchar(50),
                        email varchar(50) primary key,
                        phoneno varchar(15),
                        subject varchar(300),
                        message varchar(20000),
                        extrainfo varchar(500)
                    )`);
                 })
                 .then(_=>{
                    console.log('DB initialize complete')
                 });
};

module.exports={
    init
}

