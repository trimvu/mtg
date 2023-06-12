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
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const db = require('../models');
//create card
router.post("/card", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { cardName, addedPrice, quantity, currentPrice, listID } = req.body;
    try {
        let newCardRecord = yield db.cards.create({ cardName, addedPrice, quantity, currentPrice, listID });
        res.json(newCardRecord);
    }
    catch (err) {
        return res.status(623).json({ error: "Can't access database //create card" });
    }
}));
//get all cards
router.post("/cardList", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let listID = req.body;
    console.log("body.req is", req.body);
    console.log('list id card list', listID);
    try {
        const allListCards = yield db.cards.findAll({ where: listID });
        // console.log("all list cards ", allListCards)
        res.json(allListCards);
    }
    catch (err) {
        return res.status(624).json({ error: "Can't find database //get all cards from a list" });
    }
}));
// get ALL ALL cards
router.get("/cardAll", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCards = yield db.cards.findAll();
        // console.log("all list cards ", allCards.sort((a, b) => a.id - b.id))
        res.json(allCards.sort((a, b) => a.id - b.id));
    }
    catch (err) {
        return res.status(624).json({ error: "Can't find database //get all cards from a list" });
    }
}));
// get a card
router.get("/card/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const list = yield db.cards.findAll({ where: { id: id } });
        res.json(list);
    }
    catch (err) {
        return res.status(624).json({ error: "Can't find database //get an individual card" });
    }
}));
// update a card quantity
router.put("/card/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quantity = req.body.quantity;
        const id = req.params.id;
        const updateCardQuantity = yield db.cards.update({ quantity: quantity }, { where: { id: id } });
        // const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json("Card quantity was updated!");
    }
    catch (err) {
        return res.status(624).json({ error: "Can't find database //update a card quantity" });
    }
}));
// update a card's current price
router.put("/card-price-update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { currentPrice } = req.body;
        const id = req.params.id;
        const updateCardQuantity = yield db.cards.update({ currentPrice }, { where: { id: id } });
        // const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json("Card price was updated!");
    }
    catch (err) {
        return res.status(624).json({ error: "Can't find database //update a card's current price" });
    }
}));
//delete a card
router.delete("/card/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // let id = req.body;
    try {
        const id = req.params.id;
        const deleteCard = yield db.cards.destroy({ where: { id: id } });
        res.json("Card was deleted!");
    }
    catch (err) {
        return res.status(624).json({ error: "Can't find database //delete a card" });
    }
}));
// delete all cards from a list
router.delete("/deleteAllCards/:listID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // let id = req.body;
    try {
        // console.log(req.params.listID)
        const listID = req.params.listID;
        // console.log(listID)
        const deleteAllCards = yield db.cards.destroy({ where: { listID: listID } });
        res.json("All cards from list were deleted!");
    }
    catch (err) {
        return res.status(624).json({ error: "Can't find database //delete a card" });
    }
}));
module.exports = router;
