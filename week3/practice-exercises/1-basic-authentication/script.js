/**
 * 2. Authentication
 *
 * Using node-fetch make an authenticated request to https://restapiabasicauthe-sandbox.mxapps.io/api/books
 * Print the response to the console. Use async-await and try/catch.
 *
 * Hints:
 * - for basic authentication the username and password need to be base64 encoded
 */

const fetch = require('node-fetch');

async function printBooks() {
  const url = 'https://restapiabasicauthe-sandbox.mxapps.io/api/books';
  const credentials = 'admin:hvgX8KlVEa';
  const encodedCredentials = btoa(credentials);

  const headers = {};
  headers.Authorization = `Basic ${encodedCredentials}`;

  const response = await fetch(url, { headers });
  console.log(response);
}

printBooks();
