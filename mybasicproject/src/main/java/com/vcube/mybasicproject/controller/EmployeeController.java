package com.vcube.mybasicproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vcube.mybasicproject.model.Employee;
import com.vcube.mybasicproject.service.EmployeeService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1")
public class EmployeeController {
     @Autowired
	EmployeeService employeeService;
	@PostMapping("insertEmp")
	Employee insertEmp(@RequestBody Employee employee) {
		return employeeService.insertEmployee(employee);
	}
	
	@GetMapping("getEmpList")
	List<Employee>getEmpList(){
		return employeeService.getEmpList();
	}
	@GetMapping("getEmpById/{eid}")
	Employee getEmployeeInfo(@PathVariable("eid")long eid) {
		return employeeService.getEmployeeByID(eid);
	}
	@GetMapping("getEmpByEphone/{ephone}")
	Employee getEmployeeEphone(@PathVariable("ephone")long ephone) {
		return employeeService.getEmployeeByEphone(ephone);
	}
	@PostMapping("updateEmp/{eid}")
	Employee updateEmployee(@RequestBody Employee employee, @PathVariable("eid")long eid){
		
		Employee existedEmp=employeeService.getEmployeeByID(eid);
		existedEmp.setAge(employee.getAge());
		existedEmp.setCity(employee.getCity());
		existedEmp.setEname(employee.getEname());
		existedEmp.setEphone(employee.getEphone());
		existedEmp.setEsal(employee.getEsal());
		
		return employeeService.updateEmployee(existedEmp);
	}
	@DeleteMapping("deleteEmp/{eid}")
	String deleteEMployee(@PathVariable("eid")long eid) {
		return employeeService.deleteEmpById(eid);
	}
}
