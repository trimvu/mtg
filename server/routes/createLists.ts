import { Request, Response } from "express";

// const express = require('express');
import express from 'express';
const router = express.Router();
const db = require('../models')


// router.get('/', (req, res) => {

//     res.send('home page bois')

// })

//create list

router.post("/list", async(req: Request, res: Response) => {
    let {listname, userID} = req.body;

    try {
        
        let newListRecord = await db.lists.create({listname, userID})

        res.json(newListRecord)

    } catch (err) {
        return res.status(523).json({error: "Can't access database //create list"})
    }
})

//get all list

router.post("/allList", async(req: Request, res: Response) => {
    let userID = req.body;

    try {
        const allUserLists = await db.lists.findAll({where: userID})
        res.json(allUserLists)
    } catch (err) {
        return res.status(524).json({error: "Can't find database //get all list"})
    }
})

// get a list

// router.get("/list/:listname", async (req: Request, res: Response) => {
router.get("/list", async (req: Request, res: Response) => {
    let listname = req.body.list;
    // console.log("req.body is", req.body)
    // console.log("listname", listname)
    try {
        // const id = req.params.id;
        const list = await db.lists.findAll({where: {listname}});
        console.log("list: ", list)
        res.json(list);
        // res.json({token: token(req.user), userID: req.user.dataValues.id, username: req.user.dataValues.username})
        // console.log("list logging route: ", req)
    } catch (err) {
        return res.status(524).json({error: "Can't find database //get A list"})
    }
})

// get a list by name

router.post("/getListID", async (req: Request, res: Response) => {
    let listname = req.body.list;
    // console.log("req.body is ", req.body)
    // console.log(listname)
    try {
        const list = await db.lists.findAll({where: {listname}});
        // console.log(list)
        res.json(list)
    } catch (err) {
        return res.status(524).json({error: "Can't find database // get a list by name"})
    }
})

// get a list with cards

// router.post('/list-card/', async (req: Request, res: Response) => {
//     // let { id } = req.params;
//     let listname = req.body.list;
//     console.log("lsit name is ", listname)
//     // console.log("id is: ", id)
//     console.log("listname is: ", listname)
//     try {
//         let listObject = await db.cards.findAll({ where: { listID: id }})
//         console.log(listObject)
//         let cardids = await listObject.map(cards => cards.dataValues.cardName)
//         console.log("cardids", cardids)
//     } catch (error) {
//         console.log(error)
//     }
// })

// update a list name

router.put("/list/:id", async (req: Request, res: Response) => {
    
    try {
        const listname = req.body.listname;
        const id = req.params.id;
        const updateListname = await db.lists.update({ listname: listname }, {where: {id: id}})

        res.json("List name was updated!");
    } catch (err) {
        return res.status(524).json({error: "Can't find database //update a list name"})
    }
})

//delete a list

router.delete("/list/:id", async (req: Request, res: Response) => {
    // let id = req.body;
    
    try {
        const id = req.params.id;
        const deleteList = await db.lists.destroy({where: {id: id}})

        res.json("List was deleted!");
    } catch (err) {
        return res.status(524).json({error: "Can't find database //delete a list"})
    }
})

// delete all lists in profile

router.delete("/deleteAllLists/:userID", async (req: Request, res: Response) => {
    // let id = req.body;
    
    try {
        const userID = req.params.userID;
        console.log(userID)
        const deleteAllList = await db.lists.destroy({where: {userID: userID}})

        res.json("All lists were deleted!");
    } catch (err) {
        return res.status(524).json({error: "Can't find database //delete all list"})
    }
})

module.exports = router;