/**
 * @author Vivek Kumar Ghosh
 *
 */
package com.stagingstackmanagement.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.stagingstackmanagement.main.entities.Team;
import com.stagingstackmanagement.main.services.TeamService;


@Controller
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TeamController {
	
	@Autowired
	private TeamService teamService;
	
	@GetMapping(path="/teams")
	@ResponseBody
	public ResponseEntity<List<Team>> getTeams() {
		return teamService.getTeams();
	}
	
	@PostMapping(path="/teams", consumes="application/json")
	@ResponseBody
	public ResponseEntity<Team> addTeam(@RequestBody Team team) {
		return teamService.addTeam(team);
	}
	
	@GetMapping(path="/teams/{teamId}")
	@ResponseBody
	public ResponseEntity<Team> getTeam(@PathVariable String teamId) {
		return teamService.getTeam(Long.parseLong(teamId));
	}
	
	@Modifying
	@PutMapping(path="/teams/{teamId}/update", consumes="application/json")
	@ResponseBody
	public ResponseEntity<Team> updateTeam(@PathVariable String teamId, @RequestBody Team team) {
		return teamService.updateTeam(Long.parseLong(teamId), team);
	}
	
	@Modifying
	@DeleteMapping(path="/teams/{teamId}/delete")
	@ResponseBody
	public ResponseEntity<Team> deleteTeam(@PathVariable String teamId) {
		return teamService.deleteTeam(Long.parseLong(teamId));
	}
}
