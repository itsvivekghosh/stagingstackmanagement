/**
 * @author Vivek Kumar Ghosh
 *
 */
package com.stagingstackmanagement.main.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import com.stagingstackmanagement.main.entities.Admin;

public interface AdminDAO extends JpaRepository<Admin, Long> {}
