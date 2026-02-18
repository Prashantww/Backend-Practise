const app = require("./src/app");

// app.use(express.json());

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
