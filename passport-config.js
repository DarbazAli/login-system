const passport = require("passport")

const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

function initializePassport(passport, getUserByEmail, getUserById) {



    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email);

        // validate email
        if ( user == null ) {
            return done(null, false, {message: 'No user found with this email'});
        }

        // validate password
        try 
        {
            if ( await bcrypt.compare(password, user.password))
            {
                // user authenticated
                return done(null, user);
            }
            else {
                return done(null, false, {message: 'Password incorrect'})
            }
        }

        catch(err)
        {
            return done(err);
        }
    }



    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))



    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })

}


module.exports = initializePassport;