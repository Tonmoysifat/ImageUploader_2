const app = require("./app");
// const port = process.env.PORT || 9001;
const port = 9001;

app.listen(port, () => {
  console.log(`server is running port http://localhost:${port}`);
});
