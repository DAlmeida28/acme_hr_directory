const client = require('./client.js');

const createEmployees = async (employeeName, employeeId) => {

  await client.query(`
    INSERT INTO employees(name, department_id)
    VALUES('${employeeName}', '${employeeId}')
    RETURNING *; 
    `)
  }

  module.exports = {
    createEmployees
  }