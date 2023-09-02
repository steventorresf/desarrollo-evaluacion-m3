const app = require('./app');
const port = process.env.PORT;

const main = async () => {  
  const db = require('./db/client');
  await db.connectToMongoDB();
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });
}

main();