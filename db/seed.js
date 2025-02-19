const client = require('./client.js');
const {createDepartments} = require('./departments.js');
const {createEmployees} = require('./employees.js');

const dropTables = async () => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS employees;
      DROP TABLE IF EXISTS departments;
      `);
  } catch (err) {
    console.log(err);
  }

}

const createTables = async () => {
  try {
    await client.query(`
      CREATE TABLE departments (
      id SERIAL PRIMARY KEY,
      name VARCHAR(45) UNIQUE NOT NULL
      );

      CREATE TABLE employees (
      id SERIAL PRIMARY KEY,
      name VARCHAR(30) NOT NULL,
      department_id INTEGER REFERENCES departments(id)
      );
    `);
  }
  catch (err) {
    console.log(err);
  }
}

const seed = async () => {
  try {

    console.log('Connecting to DB..');
    await client.connect();
    console.log('Connected to DB.');

    console.log('------------------');

    console.log('Dropping Tables..');
    await dropTables();
    console.log('Tables Dropped.');

    console.log('------------------');

    console.log('Creating Tables..');
    await createTables();
    console.log('Tables Created.');

    console.log('------------------');

    console.log('Creating Department Rows..');
    const electronics = await createDepartments('Electronics');
    const kitchen = await createDepartments('Kitchen');
    const bath = await createDepartments('Bath');
    const office = await createDepartments('Home Office');
    const toys = await createDepartments('Toys');
    const garden = await createDepartments('Garden');
    console.log('Department Rows Created. ')

    console.log('------------------');
    
    console.log('Creating Employees..');
    await createEmployees('George McGeorgenson', electronics.id);
    await createEmployees('Benjamin McBenny', electronics.id);
    await createEmployees('Alice Jane', bath.id);
    await createEmployees('Paul Cat', toys.id);
    await createEmployees('Joe Dogs', garden.id);
    console.log('Employee Created');

    console.log('------------------');


    await client.end();
    console.log('Disconnected from DB.');
  } catch (err) {
    console.log(err);
  }
}

seed();