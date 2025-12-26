package com.vcube.mybasicproject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vcube.mybasicproject.model.Employee;
import com.vcube.mybasicproject.repo.EmployeeRepo;

@Service
public class EmployeeService {
   @Autowired
	EmployeeRepo empRepo;
	
	public Employee insertEmployee(Employee employee){
		return empRepo.save(employee);
	}
	
	public List<Employee> getEmpList(){
		return empRepo.findAll();
	}
	
	public Employee getEmployeeByID(long eid) {
		return empRepo.findById(eid).orElseThrow(()-> new RuntimeException("EID is not Found"));
	}
	
	public Employee getEmployeeByEphone(long ephone) {
		return empRepo.findByEphone(ephone);
	}
	
	public Employee updateEmployee(Employee employee) {
		return empRepo.save(employee);
	}
	
	public String deleteEmpById(long eid) {
		 empRepo.deleteById(eid);
		 return eid+"- "+ "Employee Deleted Successfully";
	}
}
