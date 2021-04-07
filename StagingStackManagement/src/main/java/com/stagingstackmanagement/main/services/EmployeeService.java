package com.stagingstackmanagement.main.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.stagingstackmanagement.main.entities.Employee;

public interface EmployeeService {
	public ResponseEntity<List<Employee>> getEmployees();
	public ResponseEntity<Employee> getEmployee(long employeeId);
	public ResponseEntity<Employee> addEmployee(Employee employee);
	public ResponseEntity<Employee> updateEmployee(long employeeId, Employee employee);
	public ResponseEntity<Employee> deleteEmployee(long employeeId);
	public ResponseEntity<List<Employee>> getEmployeeByTeamId(long teamId);
}
