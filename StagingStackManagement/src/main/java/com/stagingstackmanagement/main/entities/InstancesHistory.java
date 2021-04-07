/**
 * @author Vivek Kumar Ghosh
 */
package com.stagingstackmanagement.main.entities;

import java.time.LocalDateTime;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class InstancesHistory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long historyId;
	
	private String historyLabel, historyReason; // ==> instance occupied or free
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private LocalDateTime historyTime; // History Activity Time
	
	@OneToOne(cascade = CascadeType.DETACH)
	@JoinColumn(nullable = false)
	private Employee employee; // employee associated with history

	public InstancesHistory() {
		historyTime = LocalDateTime.now();
	}

	
	/**
	 * @param historyId
	 * @param historyLabel
	 * @param historyReason
	 * @param historyTime
	 * @param employee
	 */
	public InstancesHistory(Long historyId, String historyLabel, String historyReason, LocalDateTime historyTime,
			Employee employee) {
		super();
		this.historyId = historyId;
		this.historyLabel = historyLabel;
		this.historyReason = historyReason;
		this.historyTime = historyTime;
		this.employee = employee;
	}


	/**
	 * @return the historyId
	 */
	public Long getHistoryId() {
		return historyId;
	}

	/**
	 * @param historyId the historyId to set
	 */
	public void setHistoryId(Long historyId) {
		this.historyId = historyId;
	}

	/**
	 * @return the historyLabel
	 */
	public String getHistoryLabel() {
		return historyLabel;
	}

	/**
	 * @param historyLabel the historyLabel to set
	 */
	public void setHistoryLabel(String historyLabel) {
		this.historyLabel = historyLabel;
	}

	/**
	 * @return the historyTime
	 */
	public LocalDateTime getHistoryTime() {
		return historyTime;
	}

	/**
	 * @param historyTime the historyTime to set
	 */
	public void setHistoryTime(LocalDateTime historyTime) {
		this.historyTime = historyTime;
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
	 * @return the historyReason
	 */
	public String getHistoryReason() {
		return historyReason;
	}

	/**
	 * @param historyReason the historyReason to set
	 */
	public void setHistoryReason(String historyReason) {
		this.historyReason = historyReason;
	}


	@Override
	public String toString() {
		return "InstancesHistory [historyId=" + historyId + ", historyLabel=" + historyLabel + ", historyReason="
				+ historyReason + ", historyTime=" + historyTime + ", employee=" + employee + "]";
	}
}
