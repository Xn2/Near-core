import { Request } from 'express';

import bcrypt from 'bcrypt';
import passport from 'passport';
import ApiUser from './models/ApiUser';
import User from './models/User';
const LocalStrategy = require('passport-local').Strategy;

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req: Request, username: string, password: string, done: any) => {
      const user = await ApiUser.findOne({ where: { username } });
      const profile = await User.findOne({
        where: { cardID: req.body.cardID, isClaimed: false },
      });
      if (user)
        return done(null, false, {
          message: 'This username is already taken.',
        });
      if (!profile) {
        return done(null, false, {
          message: 'Invalid or already claimed CardID',
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const data = {
        username,
        password: hashedPassword,
        cardID: req.body.cardID,
        isAdmin: false,
      };
      const newUser = await ApiUser.create(data);
      await profile.update({ isClaimed: true });
      if (!newUser) {
        return done(null, false);
      }
      return done(null, newUser);
    }
  )
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username: string, password: string, done: any) => {
      try {
        const user = await ApiUser.findOne({ where: { username } });
        if (!user) return done(null, false);
        const compare = await bcrypt.compare(password, user.password);
        if (!compare) return done(null, false);
        return done(null, user);
      } catch (error) {
        console.log(error);
      }
    }
  )
);

passport.serializeUser(function (user: any, cb: any) {
  cb(null, user);
});
passport.deserializeUser(function (obj: any, cb: any) {
  cb(null, obj);
});

export default passport;
