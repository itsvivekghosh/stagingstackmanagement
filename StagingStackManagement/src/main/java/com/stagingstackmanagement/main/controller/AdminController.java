/**
 * 
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

import com.stagingstackmanagement.main.entities.Admin;
import com.stagingstackmanagement.main.services.AdminService;

@Controller
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AdminController {

	@Autowired
	private AdminService adminService = null;
	
	public AdminController() {
		adminService = null;
	}
	
	@GetMapping(path = "/admins")
	@ResponseBody
	public ResponseEntity<List<Admin>> getAdmins() {
		return this.adminService.getAdmins();
	}
	
	@PostMapping(path = "/admins", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<Admin> addAdmin(@RequestBody Admin admin) {
		return this.adminService.addAdmin(admin);
	}
	
	@Modifying
	@PutMapping(path = "/admins/{adminId}", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<Admin> updateAdmin(@RequestBody Admin admin, @PathVariable Long adminId) {
		return this.adminService.updateAdmin(adminId, admin);
	}
	
	@Modifying
	@DeleteMapping(path = "/admins/{adminId}")
	@ResponseBody
	public ResponseEntity<Admin> deleteAdmin(@PathVariable Long adminId) {
		return this.adminService.deleteAdmin(adminId);
	}
}
