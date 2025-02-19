const client = require('./client.js');

const createDepartments = async (departmentName) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO departments(name)
      VALUES ('${departmentName}') 
      RETURNING *;
      `)
      
    const department = rows[0];
    return department;
  }
  catch (err) {
    console.log(err);

  }
}

module.exports = {
  createDepartments
}