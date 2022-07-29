import { Sequelize } from '@sequelize/core';

const db = new Sequelize({
  storage: 'db/db.sqlite',
  dialect: 'sqlite',
  logging: false,
});

const testDBConnection = async () => {
  try {
    await db.authenticate();
    console.log('Connected to the database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const initDB = async () => {
  await testDBConnection();
  await db
    .sync({
      alter: true,
    })
    .then(async () => {
      console.log('Database synchronization complete.');
    })
    .catch((err) => console.log(err));
};

export { db, initDB };
