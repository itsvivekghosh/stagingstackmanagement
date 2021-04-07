package com.stagingstackmanagement.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.stagingstackmanagement.main.entities.Employee;
import com.stagingstackmanagement.main.services.EmployeeService;

@Controller
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EmployeeController {

	@Autowired
	private EmployeeService employeeService;
	
	public EmployeeController() {
		employeeService = null;
	}
	
	@GetMapping(path="/employees")
	@ResponseBody
	public ResponseEntity<List<Employee>> getEmployees() {
		return this.employeeService.getEmployees();
	} 
	
	@GetMapping(path="/employees/{employeeId}")
	@ResponseBody
	public ResponseEntity<Employee> getEmployee(@PathVariable String employeeId) {
		return this.employeeService.getEmployee(Long.parseLong(employeeId));
	} 
	
	@PostMapping(path="/employees", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) {
		return this.employeeService.addEmployee(employee);
	}
	
	@Modifying
	@PutMapping(path="/employees/{employeeId}", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<Employee> updateEmployee(@RequestBody Employee employee, @PathVariable String employeeId) {
		return this.employeeService.updateEmployee(Long.parseLong(employeeId), employee);
	}
	
	@Modifying
	@DeleteMapping(path="/employees/{employeeId}")
	@ResponseBody
	public ResponseEntity<Employee> deleteEmployee(@PathVariable String employeeId) {
		return this.employeeService.deleteEmployee(Long.parseLong(employeeId));
	}
	
	@GetMapping(path="/employees/find-team/:teamId")
	@ResponseBody
	public ResponseEntity<List<Employee>> getEmployeeByTeamId(@PathVariable String teamId) {
		return this.employeeService.getEmployeeByTeamId(Long.parseLong(teamId));
	}
}
