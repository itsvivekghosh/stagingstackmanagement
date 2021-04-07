/**
 * @author Vivek Kumar Ghosh
 *
 */
package com.stagingstackmanagement.main.services;
import java.util.List;

import org.springframework.http.ResponseEntity;
import com.stagingstackmanagement.main.entities.Team;

public interface TeamService {
	public ResponseEntity<List<Team>> getTeams();
	public ResponseEntity<Team> getTeam(long teamId);
	public ResponseEntity<Team> addTeam(Team team);
	public ResponseEntity<Team> updateTeam(long teamId, Team team);
	public ResponseEntity<Team> deleteTeam(long teamId);
}
