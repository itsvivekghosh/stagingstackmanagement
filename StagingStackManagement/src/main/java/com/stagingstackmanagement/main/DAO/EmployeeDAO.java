/**
 * @author Vivek Kumar Ghosh
 *
 */
package com.stagingstackmanagement.main.DAO;

import org.springframework.data.jpa.repository.JpaRepository;


import com.stagingstackmanagement.main.entities.Employee;

import java.util.*;

public interface EmployeeDAO extends JpaRepository<Employee, Long> {
	public List<Employee> findByTeam_teamId(long teamId);
}

