import { hash, compare } from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import database from './users.js';
import { SECRET } from './app.js';

//POST /auth/register
export const registerUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await hash(password, 12);

    const { id } = database.create({ username, password: hashedPassword });

    res.status(201).send({ id, username });
  } catch (err) {
    next(err);
  }
};

//POST /auth/login
export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = database.getByUsername(username);
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).send('Invalid username or password');
    }

    const token = jsonwebtoken.sign({ id: user.id }, SECRET);

    res.status(201).send({ token });
  } catch (err) {
    next(err);
  }
};

//GET /auth/profile
export const getProfile = async (req, res, next) => {
  try {
    const user = await database.getById(req.id);

    res.status(200).send({ username: user.username });
  } catch (err) {
    next(err);
  }
};

//POST /auth/logout
export const logoutUser = async (req, res, next) => {
  try {
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
