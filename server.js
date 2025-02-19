const { getEmployees, createEmployees, deleteEmployee, updateEmployee } = require('./db/employees.js');
const { getDepartments } = require('./db/departments.js');

const client = require('./db/client.js');
client.connect();

const express = require('express');
const app = express(); 

app.use(express.json());


app.get('/api/v1/departments', async (req, res) =>{
  try{
    const allDepartments = await getDepartments();
    res.send(allDepartments);
  }catch(err){
    
  }
})

app.get('/api/v1/employees', async (req, res) => {
  try{
    const allEmployees = await getEmployees();
    res.send(allEmployees);
  }catch(err){
    
  }
})

app.post('/api/v1/employees', async (req, res) => {
 const {name, department_id} = req.body;

   try{
    const newEmployee = await createEmployees(name, department_id);
    res.send(newEmployee);
   }
  catch(err){
    console.log(err);

  }
})

app.put('/api/v1/employees/:id', async (req, res) => {
  const { id } = req.params;
  const { name, department_id } = req.body;

  try{
    const updatedEmployee = await updateEmployee(id, name, department_id);
    res.send(updatedEmployee);
  } catch (err) {

  }
})

app.delete('/api/v1/employees/:id', async (req, res) => {
    const { id } = req.params;

    try{
      const removedEmployee = await deleteEmployee(id);
      res.send(removedEmployee);
    } catch (err) {

    }
})

app.listen(3000, () => {
  console.log('Listening on PORT 3000');
})
 