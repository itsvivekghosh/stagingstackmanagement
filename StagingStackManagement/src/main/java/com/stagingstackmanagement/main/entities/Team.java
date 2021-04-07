package com.stagingstackmanagement.main.entities;

import javax.persistence.*;


@Entity
public class Team {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long teamId;
	
	private String teamName;
	
	
	@Column(nullable = true)
	private String teamDescription;
	
	public Team() {
		this.teamDescription="";
	}
	public Team(Long teamId, String teamName, String teamDescription) {
		super();
		this.teamId = teamId;
		this.teamName = teamName;
		this.teamDescription = teamDescription;
	}
	
	/**
	 * @return the teamId
	 */
	public Long getTeamId() {
		return teamId;
	}
	/**
	 * @param teamId the teamId to set
	 */
	public void setTeamId(Long teamId) {
		this.teamId = teamId;
	}
	/**
	 * @return the teamName
	 */
	public String getTeamName() {
		return teamName;
	}
	/**
	 * @param teamName the teamName to set
	 */
	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}
	
	/**
	 * @return the teamDescription
	 */
	public String getTeamDescription() {
		return teamDescription;
	}
	/**
	 * @param teamDescription the teamDescription to set
	 */
	public void setTeamDescription(String teamDescription) {
		this.teamDescription = teamDescription;
	}
	
	@Override
	public String toString() {
		return "Team [teamId=" + teamId + ", teamName=" + teamName 
				+ ", teamDescription=" + teamDescription + "]";
	}
}
