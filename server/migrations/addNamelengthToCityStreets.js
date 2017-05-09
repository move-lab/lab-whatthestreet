const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/', (connectionError, database) => {
  if (connectionError) console.log(connectionError);

  // Get all Databases
  const admin = database.admin();

  admin.listDatabases((error, dbs) => {
    for (let i = 0; i < dbs.databases.length; i += 1) {
      if (dbs.databases[i].name !== 'local' && dbs.databases[i].name !== 'admin') {
        const dbName = dbs.databases[i].name;
        adNameLengthFieldOnStreets(dbName);
      }
    }
  });
});

function adNameLengthFieldOnStreets(databaseName) {
  MongoClient.connect(`mongodb://localhost:27017/${databaseName}`, (connectionError, database) => {
    const collection = database.collection('streets');
    console.log('Start Updating Documents');
    collection.find().toArray((error, documents) => {
      if (error) console.log(error);

      for (let i = 0; i < documents.length; i += 1) {
        console.log(`${documents[i].properties.name} updating`);
        collection.updateOne({ _id: documents[i]._id }, { $set: { nameLength: documents[i].properties.name.length } }); // eslint-disable-line no-underscore-dangle
        console.log(`${documents[i].properties.name} updated`);
      }
    });
  });
}
