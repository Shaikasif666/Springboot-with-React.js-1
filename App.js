import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:9999/api/v1";

function App() {
  const [employees, setEmployees] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [emp, setEmp] = useState({
    ename: "",
    age: "",
    city: "",
    ephone: "",
    esal: ""
  });

  const [searchId, setSearchId] = useState("");
  const [searchPhone, setSearchPhone] = useState("");

  // -------- GET ALL --------
  const loadEmployees = async () => {
    const res = await axios.get(`${API}/getEmpList`);
    setEmployees(res.data);
  };

  // -------- INSERT --------
  const saveEmployee = async () => {
    await axios.post(`${API}/insertEmp`, emp);
    alert("Employee Added");
    resetForm();
    loadEmployees();
  };

  // -------- UPDATE --------
  const updateEmployee = async () => {
    await axios.post(`${API}/updateEmp/${editId}`, emp);
    alert("Employee Updated");
    resetForm();
    loadEmployees();
  };

  // -------- EDIT BUTTON --------
  const editEmployee = (e) => {
    setIsEdit(true);
    setEditId(e.eid);
    setEmp({
      ename: e.ename,
      age: e.age,
      city: e.city,
      ephone: e.ephone,
      esal: e.esal
    });
  };

  // -------- DELETE --------
  const deleteEmp = async (id) => {
    await axios.delete(`${API}/deleteEmp/${id}`);
    alert("Employee Deleted");
    loadEmployees();
  };

  // -------- SEARCH BY ID --------
  const getById = async () => {
    const res = await axios.get(`${API}/getEmpById/${searchId}`);
    setEmployees([res.data]);
  };

  // -------- SEARCH BY PHONE --------
  const getByPhone = async () => {
    const res = await axios.get(`${API}/getEmpByEphone/${searchPhone}`);
    setEmployees([res.data]);
  };

  // -------- RESET --------
  const resetForm = () => {
    setEmp({ ename: "", age: "", city: "", ephone: "", esal: "" });
    setIsEdit(false);
    setEditId(null);
  };

  return (
    <div className="container">
      <h2>Employee Management System</h2>

      {/* FORM */}
      <div className="card">
        <h3>{isEdit ? "Update Employee" : "Add Employee"}</h3>

        <input value={emp.ename} placeholder="Name"
          onChange={e => setEmp({...emp, ename:e.target.value})} />

        <input value={emp.age} type="number" placeholder="Age"
          onChange={e => setEmp({...emp, age:e.target.value})} />

        <input value={emp.city} placeholder="City"
          onChange={e => setEmp({...emp, city:e.target.value})} />

        <input value={emp.ephone} type="number" placeholder="Phone"
          onChange={e => setEmp({...emp, ephone:e.target.value})} />

        <input value={emp.esal} type="number" placeholder="Salary"
          onChange={e => setEmp({...emp, esal:e.target.value})} />

        {!isEdit ? (
          <button className="primary" onClick={saveEmployee}>Save Employee</button>
        ) : (
          <>
            <button className="primary" onClick={updateEmployee}>Update Employee</button>
            <button onClick={resetForm}>Cancel</button>
          </>
        )}
      </div>

      {/* SEARCH */}
      <div className="card">
        <h3>Search Employee</h3>
        <input type="number" placeholder="Employee ID"
          value={searchId} onChange={e => setSearchId(e.target.value)} />
        <button onClick={getById}>By ID</button>

        <input type="number" placeholder="Phone"
          value={searchPhone} onChange={e => setSearchPhone(e.target.value)} />
        <button onClick={getByPhone}>By Phone</button>

        <button className="primary" onClick={loadEmployees}>Load All</button>
      </div>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Age</th><th>City</th>
            <th>Phone</th><th>Salary</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(e => (
            <tr key={e.eid}>
              <td>{e.eid}</td>
              <td>{e.ename}</td>
              <td>{e.age}</td>
              <td>{e.city}</td>
              <td>{e.ephone}</td>
              <td>{e.esal}</td>
              <td>
                <button onClick={() => editEmployee(e)}>Edit</button>
                <button className="danger" onClick={() => deleteEmp(e.eid)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
