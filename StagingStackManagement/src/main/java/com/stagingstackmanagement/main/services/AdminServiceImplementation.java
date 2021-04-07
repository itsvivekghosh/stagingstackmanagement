/**
 * @author Vivek Kumar Ghosh
 *
 */
package com.stagingstackmanagement.main.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stagingstackmanagement.main.DAO.AdminDAO;
import com.stagingstackmanagement.main.entities.Admin;

@Service
public class AdminServiceImplementation implements AdminService {

	@Autowired
	private AdminDAO adminDAO = null;
	public AdminServiceImplementation() {
		adminDAO = null;
	}

	@Override
	public ResponseEntity<List<Admin>> getAdmins() {
		List<Admin> admins = null;
		try {
			admins = adminDAO.findAll();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(admins);
		}
		return ResponseEntity.status(HttpStatus.OK).body(admins);
	}

	@Override
	public ResponseEntity<Admin> getAdmin(Long adminId) {
		Admin admin = null;
		try {
			admin = adminDAO.findById(adminId).get();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(admin);
		}
		return ResponseEntity.status(HttpStatus.OK).body(admin);
	}

	@Override
	public ResponseEntity<Admin> addAdmin(Admin admin) {
		Admin addedAdminEntity = null;
		try {
			addedAdminEntity = adminDAO.save(admin);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(addedAdminEntity);
		}
		return ResponseEntity.status(HttpStatus.OK).body(addedAdminEntity);
	}

	@Override
	public ResponseEntity<Admin> updateAdmin(Long adminId, Admin admin) {
		Admin adminEntity = null;
		try {
			adminEntity = adminDAO.findById(adminId).get();
			adminEntity.setAdminName(admin.getAdminName());;
			adminEntity.setAdminMobileNumber(admin.getAdminMobileNumber());
			
			adminDAO.save(adminEntity);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(adminEntity);
		}
		return ResponseEntity.status(HttpStatus.OK).body(adminEntity);
	}

	@Override
	public ResponseEntity<Admin> deleteAdmin(Long adminId) {
		Admin adminEntity = null;
		try {
			adminEntity = adminDAO.findById(adminId).get();
			adminDAO.delete(adminEntity);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(adminEntity);
		}
		return ResponseEntity.status(HttpStatus.OK).body(adminEntity);
	}

}
