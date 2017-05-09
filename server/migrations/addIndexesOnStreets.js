const MongoClient = require('mongodb').MongoClient;

/** Add Indexes */
MongoClient.connect('mongodb://localhost:27017/', (connectionError, database) => {
  if (connectionError) console.log(connectionError);

  // Get all Databases
  const admin = database.admin();

  admin.listDatabases((error, dbs) => {
    const databases = dbs.databases;

    for (let i = 0; i < databases.length; i += 1) {
      if (databases[i].name !== 'local' && databases[i].name !== 'admin') {
        const dbName = databases[i].name;
        createIndexForStreets(dbName);
      }
    }
  });
});

function createIndexForStreets(databaseName) {
  MongoClient.connect(`mongodb://localhost:27017/${databaseName}`, (connectionError, database) => {
    const collection = database.collection('streets');
    collection.dropAllIndexes((error) => {
      if (error) console.log(error);
      collection.createIndex(['properties.length', 'nameLength'], { unique: false, background: true, w: 1 }, (err, indexName) => {
        if (err) console.log(err);
        console.log(`Created Index: ${indexName}`);
        process.exit();
      });
    });
  });
}
