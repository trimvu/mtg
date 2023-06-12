import done from "jwt-simple"

// require passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; // local strategy
const JwtStrategy = require('passport-jwt').Strategy; // jwt strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;

// access db

const db = require('../models'); // access to all models in the db

// bcrypt 
const bcrypt = require('bcryptjs');

// secret file for JWT

// const secrets = require('../secrets');


/**
 * Local Strategy
 * * determine if user email and password are correct by checking what's inside of db
 */

// options map the default username to email

let options = {
    usernameField: 'email'
}

let localLogin = new LocalStrategy(options, async (email: string, password: string, done: (first: Error | null | unknown, second?: Boolean | object) => void)=> { // generally, username is the first in the parenthesis where email is. so use option to remap

    try{

        // check to see if email is in our db
        let records = await db.users.findAll({where: {email}}) // [{}, {}, {}, {} ]

        if(records !== null){
            // *if the email was found, 

            // check if password is valid
            bcrypt.compare(password, records[0].password, (err: Error, isMatch: Boolean)=>{ // compares the password input by user to the record in the db object

                if(err){
                    return done(err) // error found by bcrypt
                }

                if(!isMatch){
                    return done(null, false) // no auth because passwords didn't match
                }

                // valid user - send back to the login route req.user

                // if match found, then user is valid

                // if no match, then user is invalid

                // console.log("local login record: ", records)
                return done(null, records[0]) // => this is set on req.user
            }) 


        }
        else{
            // no email was found

            // exit with an error
            return done(null, false)
        }

    }
    catch(error){
        // this is if can't access db. something fails

        return done(error)
    }
})

passport.use(localLogin)

/**
 * JWT Strategy
 * * check to see if token is valid
 */

let jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.AUTH_SECRETS,
}

type PayloadProp = {
    sub: string | number
}

let jwtLogin = new JwtStrategy(jwtOptions, async (payload: PayloadProp, done: (first: unknown | null, second?: object | Boolean) => void)=> { // payload = {sub, iat, secrets}

    try{
        // check if user is in db
        
        let userID = payload.sub

        let user = await db.users.findByPk(userID); // {} - object

        // true - success

        if(user){
            return done(null, user) // place the user object on req.user

            // req.user = {id, email, password}
        }
        else{

            // else - error
            return done(null, false)

        }

    }
    catch(error){
        // error reading db

        return done(error)
    }

})

passport.use(jwtLogin)

