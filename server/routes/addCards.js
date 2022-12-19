const express = require('express');
const router = express.Router();
const db = require('../models')


//create card

router.post("/card", async(req, res) => {
    let {cardName, addedPrice, quantity, currentPrice, listID} = req.body;

    try {
        
        let newCardRecord = await db.cards.create({cardName, addedPrice,quantity,currentPrice, listID})

        res.json(newCardRecord)

    } catch (err) {
        return res.status(623).json({error: "Can't access database //create card"})
    }
})

//get all cards

router.get("/card", async(req, res) => {
    let listID = req.body;

    try {
        const allListCards = await db.cards.findAll({where: listID})
        res.json(allListCards)
    } catch (err) {
        return res.status(624).json({error: "Can't find database //get all cards from a list"})
    }
})

// get a card

router.get("/card/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const list = await db.cards.findAll({where: {id: id}})

        res.json(list);
    } catch (err) {
        return res.status(624).json({error: "Can't find database //get an individual card"})
    }
})

// update a card quantity

router.put("/card/:id", async (req, res) => {
    
    try {
        const quantity = req.body.quantity;
        const id = req.params.id;
        const updateCardQuantity = await db.cards.update({ quantity: quantity }, {where: {id: id}})
        // const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);

        res.json("Card quantity was updated!");
    } catch (err) {
        return res.status(624).json({error: "Can't find database //update a card quantity"})
    }
})

// update a card's current price

router.put("/card-price-update/:id", async (req, res) => {
    
    try {
        const { currentPrice } = req.body;
        const id = req.params.id;
        const updateCardQuantity = await db.cards.update({ currentPrice }, {where: {id: id}})
        // const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);

        res.json("Card price was updated!");
    } catch (err) {
        return res.status(624).json({error: "Can't find database //update a card's current price"})
    }
})

//delete a card

router.delete("/card/:id", async (req, res) => {
    // let id = req.body;
    
    try {
        const id = req.params.id;
        const deleteCard = await db.cards.destroy({where: {id: id}})

        res.json("Card was deleted!");
    } catch (err) {
        return res.status(624).json({error: "Can't find database //delete a card"})
    }
})

module.exports = router;