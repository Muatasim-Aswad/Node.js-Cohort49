import jsonwebtoken from 'jsonwebtoken';
import { SECRET } from './app.js';

//POST /auth/register
//POST /auth/login
export const checkCredentials = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  next();
};

//GET /auth/profile
//POST /auth/logout
export const getIdFromJWT = (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error();
    const token = req.headers.authorization.split(' ')[1];

    const { id } = jsonwebtoken.verify(token, SECRET);
    if (!id) throw new Error();

    req.id = id;
    next();
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
};
