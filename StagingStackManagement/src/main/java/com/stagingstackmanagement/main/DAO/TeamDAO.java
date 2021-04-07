/**
 * @author Vivek Kumar Ghosh
 *
 */
package com.stagingstackmanagement.main.DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stagingstackmanagement.main.entities.Team;

public interface TeamDAO extends JpaRepository<Team, Long> {}
