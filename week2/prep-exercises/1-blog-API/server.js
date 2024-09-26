const express = require('express');
const app = express();

const { formatFileName, fileCRUD: blog } = require('./utils.js');

PORT = process.env.PORT || 3000;

//---middleware
app.use(express.json());
const blogs = express.Router();
app.use('/blogs', blogs);

//--routes
blogs.post('/', async (req, res, next) => {
  const { title, content } = req.body;

  await blog('create', title, content);

  res.status(201).send(req.body);
});

blogs.get('/:title', async (req, res, next) => {
  const data = await blog('retrieve', req.params.title);

  const responseBody = {
    title: formatFileName(req.params.title),
    content: data,
  };

  res.status(200).send(responseBody);
});

blogs.put('/:title', async (req, res, next) => {
  await blog('update', req.params.title, req.body.content);

  res.status(200).send(req.body);
});

blogs.delete('/:title', async (req, res, next) => {
  await blog('delete', req.params.title);

  res.status(204).send();
});

//--listen
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
