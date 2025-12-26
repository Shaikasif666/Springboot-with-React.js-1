package com.vcube.mybasicproject.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vcube.mybasicproject.model.Employee;
@Repository
public interface EmployeeRepo extends JpaRepository<Employee, Long>{

	Employee findByEphone(long ephone);

}
