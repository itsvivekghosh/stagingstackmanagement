/**
 * @author Vivek Kumar Ghosh
 *
 */
package com.stagingstackmanagement.main.entities;

import javax.persistence.*;


@Entity
public class Employee {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long employeeId;
	
	private String employeeFirstName;
	private String employeeLastName;
	private Long employeeMobileNumber;
	
	@OneToOne(cascade = CascadeType.MERGE)
	private Team team;
	
	/**
	 * Default Contructor 
	 */
	public Employee() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @return the employeeId
	 */
	public Long getEmployeeId() {
		return employeeId;
	}

	/**
	 * @param employeeId the employeeId to set
	 */
	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}

	/**
	 * @return the employeeFirstName
	 */
	public String getEmployeeFirstName() {
		return employeeFirstName;
	}

	/**
	 * @param employeeFirstName the employeeFirstName to set
	 */
	public void setEmployeeFirstName(String employeeFirstName) {
		this.employeeFirstName = employeeFirstName;
	}

	/**
	 * @return the employeeLastName
	 */
	public String getEmployeeLastName() {
		return employeeLastName;
	}

	/**
	 * @param employeeLastName the employeeLastName to set
	 */
	public void setEmployeeLastName(String employeeLastName) {
		this.employeeLastName = employeeLastName;
	}

	/**
	 * @return the employeeMobileNumber
	 */
	public Long getEmployeeMobileNumber() {
		return employeeMobileNumber;
	}

	/**
	 * @return the team
	 */
	public Team getTeam() {
		return team;
	}

	/**
	 * @param team the team to set
	 */
	public void setTeam(Team team) {
		this.team = team;
	}

	/**
	 * @param employeeMobileNumber the employeeMobileNumber to set
	 */
	public void setEmployeeMobileNumber(Long employeeMobileNumber) {
		this.employeeMobileNumber = employeeMobileNumber;
	}

	public Employee(Long employeeId, String employeeFirstName, String employeeLastName, Long employeeMobileNumber, Team team) {
		super();
		this.employeeId = employeeId;
		this.team = team;
		this.employeeFirstName = employeeFirstName;
		this.employeeLastName = employeeLastName;
		this.employeeMobileNumber = employeeMobileNumber;
	}
}
