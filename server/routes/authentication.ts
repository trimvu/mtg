import { Request, Response, Router } from "express";

const express = require("express");
// const router = express.Router();
const router = Router()
const jwt = require('jwt-simple'); // allows us to create a jwt token
const db = require('../models') // access to all db models
const bcrypt = require('bcryptjs'); // used to encrypt passwords

declare global {
    module Express {
      interface Request {
        user: {
            id?: number | string
        }
      }
    }
}

// const secrets = require('../secrets'); // secrets object inside of secrets.js file in root directory

const passport = require('passport');

// must initialize passport for it to work
router.use(passport.initialize());

// import all of the passAuth code from ../auth/passAuth.js file
require('../auth/passAuth');

// must call authenticate method on passport instance 
//* this is our gatekeeper
let requireLogin = passport.authenticate('local', {session: false})
let requireJwt = passport.authenticate('jwt', {session: false})

router.use(express.urlencoded({extended: false})) // scrape email and pwd frm request header 
router.use(express.json())  //req.body


// this function return a JWT
const token = (userRecord: any) => {
    
    let timestamp = new Date().getTime(); // current time

    return jwt.encode({sub: userRecord.id, iat: timestamp}, process.env.AUTH_SECRETS) // first argument is the payload, second argument is secret

}


// console.log(token({id: 1}))

router.get('/', (req: Request, res: Response) => {

    res.send('home page')
})

// when react sends us info from form, and we send back a JWT to be saved on the client side - 
// because token is what authenticates the user and persists their login.
router.post('/register', async (req: Request, res: Response) => {

    // collect info from header
    // email, username, password

    let {email, username, password} = req.body;

    
    // *determine if email already exists in our db
    try {

        // if anything is returned from this query, it means that the user's email already exists
        // in our database
        let records = await db.users.findAll({where: {email}})

        if(records.length === 0){ // no record exists, must create new user record

            // encrypt our password

            password = bcrypt.hashSync(password , 8)

            // create db entry

            let newUserRecord = await db.users.create({email, username, password}) // user is an object that we just created
            // user => {id, email, username, password, createdAt, updatedAt}


            // create jwt

            let jwtToken = token(newUserRecord)


            // return our jwt

            return res.status(222).json({token: jwtToken})
        }
        else{
            // user's email already exists in our db, so send back an error message to react

            return res.status(422).json({error: "Email already exists"})
        }

    }
    catch (err) {
        return res.status(423).json({error: "Can't access database"})
    }

})

// interface UserInfoProp extends Request {
//     user: object,
// }

router.post('/login', requireLogin, (req: Request, res: Response) => {

    // when they have logged successfully
    // req.user => set by passport when a user successfully logged in
    
    // console.log("user logging route: ", req.user)

    res.json({token: token(req.user)})
    
})


router.get('/protected', requireJwt, (req: Request, res: Response)=>{

    console.log('passed protected page')

    res.json({isValid: true})
})

router.get('/profileInfo', requireJwt, async(req: Request, res: Response) => {
    
        
    try {
        let id = req.user.id
        // console.log("USERNAME ID", id)
        if (id) {
            let profile = await db.users.findAll({where: {id: id}})
            // console.log("the profile: ", profile)
            res.json(profile)
        } else {
            res.status(6003).json({Error})
        }

    } catch (error) {

        console.log("error")

        res.status(600).json({error})
    }

})

router.put('/editUsername/:id', async(req: Request, res: Response) => {
    try {
        const username = req.body.username;
        const id = req.params.id;
        const updateUsername = await db.users.update({ username: username }, {where: {id: id}})

        res.json("Name / Username was updated!");
    } catch (err) {
        return res.status(424).json({error: "Can't find database //update a username"})
    }
})

router.put('/editPassword/:id', async (req: Request, res: Response) => {
    let password = req.body.password;
    try {
        password = bcrypt.hashSync(password , 8)
        const id = req.params.id;
        // console.log("password", password)
        const updatePassword = await db.users.update({ password: password }, {where: {id: id}})

        res.json("Password was updated!")
    } catch (error) {
        return res.status(424).json({error: "Can't find database //update a password"})
    }
})

type ListsProps = {
    dataValues: {
        id: number | string
    }
}

router.delete("/deleteUser/:id", async (req: Request, res: Response) => {
    // let id = req.body;
    
    try {
        const id = req.params.id;
        const allUserLists: ListsProps[] = await db.lists.findAll({where: {userID: id}})
        // console.log("blah", allUserLists.map(lists => lists.dataValues.id))
        let allListIDs = allUserLists.map(lists => lists.dataValues.id)
        // console.log(allListIDs)
        for (const iteration of allListIDs) {
            const deleteAllCards = await db.cards.destroy({where: {listID: iteration}})
        }

        const deleteAllList = await db.lists.destroy({where: {userID: id}})
        const deleteUser = await db.users.destroy({where: {id: id}})

        res.json("User was deleted!");
    } catch (err) {
        return res.status(424).json({error: "Can't find database //delete a user"})
    }
})

// router.get('/profileUserID', requireJwt, async(req, res) => {

//     try {
//         let 
//     }
// })

module.exports = router;
