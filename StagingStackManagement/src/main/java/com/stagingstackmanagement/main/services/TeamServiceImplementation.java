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

import com.stagingstackmanagement.main.DAO.TeamDAO;
import com.stagingstackmanagement.main.entities.Team;

@Service
public class TeamServiceImplementation implements TeamService {

	@Autowired
	private TeamDAO teamDao;
	
	public TeamServiceImplementation() {
		teamDao = null;
	}

	@Override
	public ResponseEntity<List<Team>> getTeams() {
		List<Team> teams = null;
		try {
			teams = teamDao.findAll();
		} catch (Exception e) {
			System.out.println("Error found: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(teams);
		}
		return ResponseEntity.status(HttpStatus.OK).body(teams);
	}

	@Override
	public ResponseEntity<Team> getTeam(long teamId) {
		Team team = null;
		try {
			team = teamDao.findById(teamId).get();
		} catch(Exception err) {
			System.out.println(err.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(team);
		}
		return ResponseEntity.status(HttpStatus.OK).body(team);
	}

	@Override
	public ResponseEntity<Team> addTeam(Team team) {
		Team addedTeam = null;
		try {
			addedTeam = teamDao.save(team);
		} catch (Exception e) {
			System.out.println("Error found: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(addedTeam);
		}	
		return ResponseEntity.status(HttpStatus.OK).body(addedTeam);
	}

	@Modifying
	@Override
	public ResponseEntity<Team> updateTeam(long teamId, Team team) {
		Team teamUpdate = null;
		try {
			teamUpdate = teamDao.findById(teamId).get();
			teamUpdate.setTeamName(team.getTeamName());
			teamUpdate.setTeamDescription(team.getTeamDescription());
			
			teamDao.save(teamUpdate);
		} catch(NoSuchElementException exception) {
			System.out.println(exception.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(teamUpdate);
		}
		return ResponseEntity.status(HttpStatus.OK).body(teamUpdate);
	}

	@Modifying
	@Override
	public ResponseEntity<Team> deleteTeam(long teamId) {
		Team teamEntity=null;
		try {
			teamEntity = teamDao.findById(teamId).get();
			teamDao.delete(teamEntity);
		} catch(Exception err) {
			System.out.println(err.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(teamEntity);
		}
		return ResponseEntity.status(HttpStatus.OK).body(teamEntity);
	}

}
