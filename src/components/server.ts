import express, { NextFunction, Request, Response } from 'express';
import session from 'express-session';
import passport from 'passport';
import xmlparser from 'express-xml-bodyparser';
import router from './router';

const app = express();
const defaultContentType = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  req.headers['content-type'] =
    req.headers['content-type'] || 'application/octet-stream';
  next();
};

const genSessionSecret = () => {
  let secret = '';
  const alpha = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXYZ';
  for (let i = 0; i < 32; i++) {
    secret += alpha[Math.floor(Math.random() * alpha.length)];
  }
  return secret;
};

//Middleware
app.use(defaultContentType);
app.use(xmlparser());
app.use(express.raw());
app.use(express.json());
app.use(
  session({ secret: genSessionSecret(), resave: true, saveUninitialized: true })
);
app.use('/web', express.static(__dirname + '../../components/front/public'));
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

export { app as server };
