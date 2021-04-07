/**
 * @author Vivek Kumar Ghosh
 *
 */
package com.stagingstackmanagement.main.entities;

import java.time.LocalDateTime;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Instance {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long instanceId;
	
	@Column(nullable = false)
	private String instanceName;
	
	@Column(nullable=true)
	private String instanceDescription;
	
	@OneToOne(cascade = CascadeType.DETACH)
	@JoinColumn(nullable = true)
	private Employee employee = null;
	
	@JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
	private LocalDateTime createdOn;
	
	@JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
	@Column(nullable = true)
	private LocalDateTime deletedOn;
	
	@Column(nullable = false)
	private Boolean isInstanceAvailable;
	
	@Column(nullable = true)
	private String instanceReason;

	/**
	 * Default Constructor
	 */
	public Instance() {
		this.createdOn = LocalDateTime.now();
		this.isInstanceAvailable = false;
	}
	
	/**
	 * @return the instanceId
	 */
	public Long getInstanceId() {
		return instanceId;
	}

	/**
	 * @param instanceId the instanceId to set
	 */
	public void setInstanceId(Long instanceId) {
		this.instanceId = instanceId;
	}

	/**
	 * @return the instanceDescription
	 */
	public String getInstanceDescription() {
		return instanceDescription;
	}

	/**
	 * @param instanceDescription the instanceDescription to set
	 */
	public void setInstanceDescription(String instanceDescription) {
		this.instanceDescription = instanceDescription;
	}

	/**
	 * @return the employee
	 */
	public Employee getEmployee() {
		return employee;
	}

	/**
	 * @param employee the employee to set
	 */
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}


	/**
	 * @param instanceId
	 * @param instanceName
	 * @param instanceDescription
	 * @param employee
	 * @param createdOn
	 * @param deletedOn
	 * @param isInstanceAvailable
	 * @param instanceReason
	 */
	public Instance(Long instanceId, String instanceName, String instanceDescription, Employee employee,
			LocalDateTime createdOn, LocalDateTime deletedOn, Boolean isInstanceAvailable, String instanceReason) {
		super();
		this.instanceId = instanceId;
		this.instanceName = instanceName;
		this.instanceDescription = instanceDescription;
		this.employee = employee;
		this.createdOn = createdOn;
		this.deletedOn = deletedOn;
		this.isInstanceAvailable = isInstanceAvailable;
		this.instanceReason = instanceReason;
	}

	/**
	 * @return the instanceReason
	 */
	public String getInstanceReason() {
		return instanceReason;
	}

	/**
	 * @param instanceReason the instanceReason to set
	 */
	public void setInstanceReason(String instanceReason) {
		this.instanceReason = instanceReason;
	}


	@Override
	public String toString() {
		return "Instance [instanceId=" + instanceId + ", instanceName=" + instanceName + ", instanceDescription="
				+ instanceDescription + ", employee=" + employee + ", createdOn=" + createdOn + ", deletedOn="
				+ deletedOn + ", isInstanceAvailable=" + isInstanceAvailable + ", instanceReason=" + instanceReason
				+ "]";
	}

	/**
	 * @return the createdOn
	 */
	public LocalDateTime getCreatedOn() {
		return createdOn;
	}

	/**
	 * @param createdOn the createdOn to set
	 */
	public void setCreatedOn(LocalDateTime createdOn) {
		this.createdOn = createdOn;
	}

	/**
	 * @return the deletedOn
	 */
	public LocalDateTime getDeletedOn() {
		return deletedOn;
	}

	/**
	 * @param deletedOn the deletedOn to set
	 */
	public void setDeletedOn(LocalDateTime deletedOn) {
		this.deletedOn = deletedOn;
	}

	/**
	 * @return the isInstanceAvailable
	 */
	public Boolean getIsInstanceAvailable() {
		return isInstanceAvailable;
	}

	/**
	 * @param isInstanceAvailable the isInstanceAvailable to set
	 */
	public void setIsInstanceAvailable(Boolean isInstanceAvailable) {
		this.isInstanceAvailable = isInstanceAvailable;
	}

	/**
	 * @return the instanceName
	 */
	public String getInstanceName() {
		return instanceName;
	}

	/**
	 * @param instanceName the instanceName to set
	 */
	public void setInstanceName(String instanceName) {
		this.instanceName = instanceName;
	}
	
	
}
