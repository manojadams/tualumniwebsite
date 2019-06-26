"use strict";
const dbHandler= require('./dbhandler.js');
const setup=require('./setup.js')

const _express = require('express');
const express = _express();
const bodyParser=require('body-parser');


express.use(_express.static(__dirname+'/public'));
express.use(bodyParser.json());

express.get('/init',(req,res)=>{
    setup.init();
    res.status(403).send();
});

express.get('/getall',(req,res)=>{
    //setup.init();
        dbHandler.execQuery(`select * from userinfo;`)
        .then(row=>{
            let result={
                allUser:row
            }
            res.status(200).json(result).send();
           
        })
        .catch(_=>{
            res.status(400).send();
        });
});


express.post('/adduser',(req,res)=>{
        let newUser=req.body;
        if(validateNecessaryParamsForNewUser(newUser)){
            dbHandler.execQuery(`insert into userinfo values (
                "${newUser.name}",
                "${newUser.gender||'empty'}",
                "${newUser.email}",
                "${newUser.phoneno}",
                "${newUser.yearofpassing}",
                "${newUser.department}",
                "${newUser.course}",
                "${newUser.curcountry||'empty'}",
                "${newUser.curcity||'empty'}",
                "${newUser.curorg||'empty'}",
                "${newUser.curdesignation||'empty'}"
            )`)
            .then(_=>{
                res.status(200).send();
            },_=>{
                res.status(400).send();
            })
            .catch(_=>{
                res.status(400).send();
            });
        }
        else{
            res.status(400).send();
        }
    });


express.post('/contactus',(req,res)=>{
    let queryInfo=req.body;
    if(validateNecessaryParamsForContactUS(queryInfo)){
        dbHandler.execQuery(`insert into userquery values (
            "${queryInfo.name}",
            "${queryInfo.email}",
            "${queryInfo.phoneno}",
            "${queryInfo.subject|| 'no subject'}",
            "${queryInfo.message}",
            "${queryInfo.extaraInfo||'empty'}"
        )`)
        .then(_=>{
            res.status(200).send();
        },_=>{
            res.status(400).send();
        })
        .catch(_=>{
            res.status(400).send();
        });
    }
    else{
        res.status(400).send();
    }
});


express.get('/verify',(req,res)=>{
    let queryInfo=req.body;
    if(true){
        dbHandler.execQuery(`select * from userinfo where email="${getSanitizedEmail(req)}"`)
        .then(row=>{
            let result={
                registered:false
            }
            if(row.length>0){
                result.registered=true;
            }
            res.status(200).json(result).send();
           
        })
        .catch(_=>{
            res.status(400).send();
        });
    }
    else{
        res.status(400).send();
    }

});



express.listen(80);

function getSanitizedEmail(req) {
    return req.query.email;
}

function validateNecessaryParamsForContactUS(queryInfo) {
    let status=true;
    if(!queryInfo.name || !queryInfo.email || !queryInfo.message || !queryInfo.phoneno){
        status=false;
    }
    if(queryInfo.name.trim()=='' || queryInfo.name.trim().length<2){
        status=false;
    }
    if(queryInfo.email.trim()=='' || queryInfo.email.trim().length<2 || queryInfo.email.indexOf('@')==-1 || queryInfo.email.indexOf('.')==-1){
        status=false;
    }
    if(queryInfo.phoneno.trim()=='' && queryInfo.phoneno.trim().length<8){
        status=false;
    }
    if(queryInfo.message.trim()==''){
        status=false;
    }
    return status;
}

function validateNecessaryParamsForNewUser(newUser) {
    let status=true;
    try{
    if(!newUser.name || !newUser.email || !newUser.yearofpassing || !newUser.phoneno || !newUser.department || !newUser.course){
        status=false;
    }
    if(newUser.name.trim()=='' || newUser.name.trim().length<2){
        status=false;
    }
    if(newUser.email.trim()=='' || newUser.email.trim().length<2 || newUser.email.indexOf('@')==-1 || newUser.email.indexOf('.')==-1){
        status=false;
    }
    if(newUser.phoneno.trim()=='' && newUser.phoneno.trim().length<8){
        status=false;
    }
    if(newUser.yearofpassing.trim()=='' || newUser.department.trim()=='' || newUser.course.trim()=='' ){
        status=false;
    }
    }
    catch(e){
    status=false;
    }
    return status;
}
