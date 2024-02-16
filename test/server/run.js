const express = require('express');
const app = express();
const PORT = require(`${process.cwd()}/package.json`).demo.port;
app.use(express.static(__dirname));
app.listen(PORT, (err) => {
   if (err) {
      console.error(err.message);
   }
   console.log('Open http://localhost:' + PORT);
});
