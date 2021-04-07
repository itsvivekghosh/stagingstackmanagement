/**
 * @author Vivek Kumar Ghosh
 *
 */
package com.stagingstackmanagement.main.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.stagingstackmanagement.main.entities.Admin;

public interface AdminService {
	public ResponseEntity<List<Admin>> getAdmins();
	public ResponseEntity<Admin> getAdmin(Long adminId);
	public ResponseEntity<Admin> addAdmin(Admin admin);
	public ResponseEntity<Admin> updateAdmin(Long adminId, Admin admin);
	public ResponseEntity<Admin> deleteAdmin(Long adminId);
}
