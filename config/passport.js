// Dependencies required
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");

passport.use(new LocalStrategy(
    //Email is generally easier than creating a username so we're creating that in the place of username
    {usernameField: "email"},
    function(email, password, done) {
    // User tries to sign in, passport will look for a matching user
        db.User.findOne({ 
            where: {
                email: email
            }
        }).then(dbUser => {
          // If the email is incorrect
            if(!dbUser){
                return done(null, false, {
                    message: "There's no user with that email."
                });
            }
            // If the email is right but the password is wrong
            if(!dbUser.validPassword(password)) {
                return done(null, false, {
                    message: "That password is invalid."
                });
            //If everything is right, return the user data
            }
                done(null, dbUser);
        }).catch(err => {
            done(err);
        })
    }
));

// Restore/remember authentication state across the HTTP requests during the user's session
// Serializing/deserializing the user data needs to happen
passport.serializeUser( (user, done) => {
    done(null, user.id);
});

passport.deserializeUser( (id, done) => {
    db.User.findByPk(id).then( (err, user) => {
        if (err) {
            return done(err)
        }else{
            done(null, user)
        }
    });
});

//Exporting the passport configuration for use in the server
module.exports = passport;