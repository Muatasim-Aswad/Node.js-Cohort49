import express from 'express';
import crypto from 'crypto';

import { checkCredentials, getIdFromJWT } from './routeMiddleware.js';
import {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
} from './routeHandlers.js';

export const SECRET = crypto.randomBytes(64).toString('hex');

let app = express();

app.use(express.json());

//routes
app.post('/auth/register', checkCredentials, registerUser);

app.post('/auth/login', checkCredentials, loginUser);

app.get('/auth/profile', getIdFromJWT, getProfile);

app.post('/auth/logout', getIdFromJWT, logoutUser);

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal server error');
});

// Serve the front-end application from the `client` folder
app.use(express.static('client'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
