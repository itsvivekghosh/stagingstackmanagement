/**
 * @author Vivek Kumar Ghosh
 *
 */
package com.stagingstackmanagement.main.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stagingstackmanagement.main.DAO.EmployeeDAO;
import com.stagingstackmanagement.main.entities.Employee;

@Service
public class EmployeeServiceImplementation implements EmployeeService {
	
	@Autowired
	private EmployeeDAO employeeDao;
	
	public EmployeeServiceImplementation() {
		employeeDao = null;
	}

	@Override
	public ResponseEntity<List<Employee>> getEmployees() {
		List<Employee> employees = null;
		try {
			employees = employeeDao.findAll();
		} catch (Exception e) {
			System.out.println("Error found: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(employees);
		}
		return ResponseEntity.status(HttpStatus.OK).body(employees);
	}

	@Override
	public ResponseEntity<Employee> getEmployee(long employeeId) {
		Employee employee = null;
		try {
			employee = employeeDao.findById(employeeId).get();
		} catch (Exception e) {
			System.out.println("Error found: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(employee);
		}
		return ResponseEntity.status(HttpStatus.OK).body(employee);
	}

	@Override
	public ResponseEntity<Employee> addEmployee(Employee employee) {
		Employee addedEmployee = null;
		try {
			addedEmployee = employeeDao.save(employee);
		} catch (Exception e) {
			System.out.println("Error found: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(addedEmployee);
		}	
		return ResponseEntity.status(HttpStatus.OK).body(addedEmployee);
	}
	
	@Modifying
	@Override
	public ResponseEntity<Employee> updateEmployee(long employeeId, Employee employee) {
		Employee employeeUpdate = null;
		try {
			employeeUpdate = employeeDao.findById(employeeId).get();
			employeeUpdate.setEmployeeFirstName(employee.getEmployeeFirstName());
			employeeUpdate.setEmployeeLastName(employee.getEmployeeLastName());
			employeeUpdate.setEmployeeMobileNumber(employee.getEmployeeMobileNumber());
			employeeUpdate.setTeam(employee.getTeam());
			
			employeeDao.save(employeeUpdate);
		} catch(NoSuchElementException exception) {
			System.out.println(exception.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(employeeUpdate);
		}
		return ResponseEntity.status(HttpStatus.OK).body(employeeUpdate);
	}
	
	@Modifying
	@Override
	public ResponseEntity<Employee> deleteEmployee(long employeeId) {
		Employee employeeDeleted = null;
		try {
			employeeDeleted = employeeDao.findById(employeeId).get();
			employeeDao.delete(employeeDeleted);
		} catch(Exception err) {
			System.out.println(err.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(employeeDeleted);
		}
		return ResponseEntity.status(HttpStatus.OK).body(employeeDeleted);
	}

	@Override
	public ResponseEntity<List<Employee>> getEmployeeByTeamId(long teamId) {
		List<Employee> employees = null;
		try {
			employees = employeeDao.findByTeam_teamId(teamId);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(employees);
		}
		return ResponseEntity.status(HttpStatus.OK).body(employees);
	}
}
