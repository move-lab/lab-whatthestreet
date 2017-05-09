exports.getAllGuesses = (request, response) => {
  request.db.open((err, db) => {
    const collection = db.collection('guesses');
    collection.find().toArray((error, items) => {
      const result = items.map((item) => (item.guess));
      const d = {};
      const out = [];

      for (let i = 0; i < result.length; i += 1) {
        const item = result[i];
        const rep = item.toString();

        if (!d[rep]) {
          d[rep] = true;
          out.push(item);
        }
      }

      response.json(out.map((item) => ({ car: item[0], bike: item[1], rail: item[2] })));
      db.close();
    });
  });
};

exports.insertGuess = (request, response) => {
  request.db.open((err, db) => {
    const collection = db.collection('guesses');

    const savedValue = [request.body.guess.car, request.body.guess.bike, request.body.guess.rail];

    collection.insertOne({ guess: savedValue }, (error, result) => {
      if (error) response.json({ message: 'faild saved', error });
      response.json({ message: 'sucsessfull saved', result });
    });
  });
};
