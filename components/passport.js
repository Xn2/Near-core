const bcrypt = require('bcrypt');
const passport = require("passport");
const db = require('./sequelize')
const LocalStrategy = require("passport-local").Strategy;

passport.use('signup', new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback

    },
    async function (req, username, password, done) {
        const user = await db.ApiUser.findOne({ where: { username } })
        const profile = await db.User.findOne({ where: { cardID: req.body.cardID, isClaimed: false } })
        if (user) return done(null, false, { message: 'This username is already taken.' });
        if (!profile) return done(null, false, { message: 'Invalid or already claimed CardID' });
        const hashedPassword = await bcrypt.hash(password, 10);
        const data =
        {
            username,
            password: hashedPassword,
            cardID: req.body.cardID,
            isAdmin: false
        };
        const newUser = await db.ApiUser.create(data);
        await profile.update({isClaimed : true})
        if (!newUser) {
            return done(null, false);
        }
        return done(null, newUser);
    }
));

passport.use('login', new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
    },
    async function (username, password, done) {
        const user = await db.ApiUser.findOne({ where: { username } })
        if (!user) return done(null, false);
        const compare = await bcrypt.compare(password, user.password);
        if (!compare) return done(null, false);
        return done(null, user)
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  //
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });

module.exports = passport