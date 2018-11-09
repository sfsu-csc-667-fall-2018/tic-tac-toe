const testInit = db => ({
  add: () =>
    db.any(
      `INSERT INTO test_table ("testString") VALUES ('Hello at ${Date.now()}')`
    ),
  all: () => db.any('SELECT * FROM test_table')
});

module.exports = testInit;
