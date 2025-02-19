const client = require('./client.js');

const createEmployees = async (employeeName, department_id) => {

try{
 const {rows} = await client.query(`
    INSERT INTO employees(name, department_id)
    VALUES('${employeeName}', '${department_id}')
    RETURNING *; 
    `)
    
    const addedEmployee = rows[0];
    return addedEmployee;
  } catch(err) {
    console.log(err);
  }
  }

const getEmployees = async () => {

    const {rows} = await client.query(`
    SELECT * FROM employees;
    `);
    return rows;
    }

const updateEmployee = async(id, name, department_id) => {

  try{
    const {rows} = await client.query(`
      UPDATE employees
      SET name='${name}', department_id=${department_id}
      WHERE id=${id}
      RETURNING *;
      `)

    return rows[0];

  } catch (err) {
    console.log(err); 
  }
}

const deleteEmployee = async (id) => {

  try {
    const {rows} = await client.query(`
      DELETE FROM employees 
      WHERE id='${id}'
      RETURNING *;
      `)
    
    return rows[0];
  } catch(err) {
    console.log(err);
  }
}

  module.exports = {
    createEmployees,
    getEmployees,
    deleteEmployee,
    updateEmployee
  }

