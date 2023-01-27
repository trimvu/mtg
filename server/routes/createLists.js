const express = require('express');
const router = express.Router();
const db = require('../models')


// router.get('/', (req, res) => {

//     res.send('home page bois')

// })

//create list

router.post("/list", async(req, res) => {
    let {listname, userID} = req.body;

    try {
        
        let newListRecord = await db.lists.create({listname, userID})

        res.json(newListRecord)

    } catch (err) {
        return res.status(523).json({error: "Can't access database //create list"})
    }
})

//get all list

router.post("/allList", async(req, res) => {
    let userID = req.body;

    try {
        const allUserLists = await db.lists.findAll({where: userID})
        res.json(allUserLists)
    } catch (err) {
        return res.status(524).json({error: "Can't find database //get all list"})
    }
})

// get a list

// router.get("/list/:listname", async (req, res) => {
router.get("/list", async (req, res) => {
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

router.post("/getListID", async (req, res) => {
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

// router.post('/list-card/', async (req, res) => {
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



//delete a list

router.delete("/list/:id", async (req, res) => {
    // let id = req.body;
    
    try {
        const id = req.params.id;
        const deleteList = await db.lists.destroy({where: {id: id}})

        res.json("List was deleted!");
    } catch (err) {
        return res.status(524).json({error: "Can't find database //delete a list"})
    }
})

module.exports = router;