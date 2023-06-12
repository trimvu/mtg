"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express');
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const db = require('../models');
// router.get('/', (req, res) => {
//     res.send('home page bois')
// })
//create list
router.post("/list", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { listname, userID } = req.body;
    try {
        let newListRecord = yield db.lists.create({ listname, userID });
        res.json(newListRecord);
    }
    catch (err) {
        return res.status(523).json({ error: "Can't access database //create list" });
    }
}));
//get all list
router.post("/allList", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userID = req.body;
    try {
        const allUserLists = yield db.lists.findAll({ where: userID });
        res.json(allUserLists);
    }
    catch (err) {
        return res.status(524).json({ error: "Can't find database //get all list" });
    }
}));
// get a list
// router.get("/list/:listname", async (req: Request, res: Response) => {
router.get("/list", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let listname = req.body.list;
    // console.log("req.body is", req.body)
    // console.log("listname", listname)
    try {
        // const id = req.params.id;
        const list = yield db.lists.findAll({ where: { listname } });
        console.log("list: ", list);
        res.json(list);
        // res.json({token: token(req.user), userID: req.user.dataValues.id, username: req.user.dataValues.username})
        // console.log("list logging route: ", req)
    }
    catch (err) {
        return res.status(524).json({ error: "Can't find database //get A list" });
    }
}));
// get a list by name
router.post("/getListID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let listname = req.body.list;
    // console.log("req.body is ", req.body)
    // console.log(listname)
    try {
        const list = yield db.lists.findAll({ where: { listname } });
        // console.log(list)
        res.json(list);
    }
    catch (err) {
        return res.status(524).json({ error: "Can't find database // get a list by name" });
    }
}));
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
router.put("/list/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listname = req.body.listname;
        const id = req.params.id;
        const updateListname = yield db.lists.update({ listname: listname }, { where: { id: id } });
        res.json("List name was updated!");
    }
    catch (err) {
        return res.status(524).json({ error: "Can't find database //update a list name" });
    }
}));
//delete a list
router.delete("/list/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // let id = req.body;
    try {
        const id = req.params.id;
        const deleteList = yield db.lists.destroy({ where: { id: id } });
        res.json("List was deleted!");
    }
    catch (err) {
        return res.status(524).json({ error: "Can't find database //delete a list" });
    }
}));
// delete all lists in profile
router.delete("/deleteAllLists/:userID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // let id = req.body;
    try {
        const userID = req.params.userID;
        console.log(userID);
        const deleteAllList = yield db.lists.destroy({ where: { userID: userID } });
        res.json("All lists were deleted!");
    }
    catch (err) {
        return res.status(524).json({ error: "Can't find database //delete all list" });
    }
}));
module.exports = router;
