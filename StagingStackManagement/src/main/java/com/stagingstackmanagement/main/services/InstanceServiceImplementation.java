/**
 * @author Vivek Kumar Ghosh
 *
 */
package com.stagingstackmanagement.main.services;

import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;
import com.stagingstackmanagement.main.DAO.InstanceDAO;
import com.stagingstackmanagement.main.entities.Employee;
import com.stagingstackmanagement.main.entities.Instance;
import com.stagingstackmanagement.main.entities.InstancesHistory;


@Service
public class InstanceServiceImplementation implements InstanceService {

	@Autowired
	private InstanceDAO instanceDao;
	
	@Autowired
	private InstanceHistoryService instanceHistoryService;
	
	public InstanceServiceImplementation() {
		instanceDao = null;
	}
	
	@Override
	public ResponseEntity<List<Instance>> getInstances() {
		List<Instance> instances = null;
		try {
			instances = instanceDao.findAll();
			Collections.sort(instances, Comparator.comparing(Instance::getCreatedOn).reversed());
		} catch (Exception e) {
			System.out.println("Error in fetching Instances: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(instances);
		}
		return ResponseEntity.status(HttpStatus.OK).body(instances);
	}
	
	@Override
	public ResponseEntity<Instance> getInstance(Long instanceId) {
		Instance instance=null;
		try {
			instance = instanceDao.findById(instanceId).get();
		} catch (Exception e) {
			System.out.println("Error in adding Instance: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(instance);
		}
		return ResponseEntity.status(HttpStatus.OK).body(instance);
	}
	
	@Override
	public ResponseEntity<Instance> addInstance(Instance instance) {
		Instance instanceAdded=null;
		try {
			instanceAdded = instanceDao.save(instance);
		} catch (Exception e) {
			System.out.println("Error in fetching Instances: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(instanceAdded);
		}
		return ResponseEntity.status(HttpStatus.OK).body(instanceAdded);
	}
	
	@Override
	public ResponseEntity<Instance> updateInstance(Instance instance, Long instanceId) {
		Instance updateInstance = null;
		try {
			updateInstance = instanceDao.findById(instanceId).get();
			updateInstance.setInstanceDescription(instance.getInstanceDescription());
			updateInstance.setEmployee(instance.getEmployee());
			updateInstance.setInstanceReason(instance.getInstanceReason());
//			System.out.println(instance.getIsInstanceAvailable());
//			updateInstance.setIsInstanceAvailable(instance.getIsInstanceAvailable()); // its commented as we can't change instance availability here
			
			instanceDao.save(updateInstance);
		} catch (Exception e) {
			System.out.println("Error in fetching Instances: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(updateInstance);
		}
		return ResponseEntity.status(HttpStatus.OK).body(updateInstance);
	}
	
	@Override
	public ResponseEntity<Instance> deleteInstance(Long instanceId) {
		Instance deleteEntityInstance = null;
		try {
			deleteEntityInstance = instanceDao.findById(instanceId).get();
			instanceDao.delete(deleteEntityInstance);
		} catch (Exception err) {
			System.out.println(err.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(deleteEntityInstance);
		}
		return ResponseEntity.status(HttpStatus.OK).body(deleteEntityInstance);
	}

	@Override
	public ResponseEntity<List<Instance>> findByInstanceName(String searchName) {
		List<Instance> foundInstances = null;
		try {
			foundInstances = instanceDao.findByInstanceNameContainingIgnoreCase(searchName);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(foundInstances);
		}
		return ResponseEntity.status(HttpStatus.OK).body(foundInstances);
	}

	@Override
	public ResponseEntity<List<Instance>> findAllOrderByCreatedOn(Integer pageNo, Integer pageSize, String sortBy) {
		// https://howtodoinjava.com/spring-boot2/pagination-sorting-example/
		Page<Instance> pagedResult = null;
		try {
			Sort sortOrder = Sort.by(sortBy).descending(); 
			Pageable paging = PageRequest.of(pageNo, pageSize, sortOrder);
			 
			pagedResult = instanceDao.findAll(paging);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ArrayList<Instance>());
		}
		if(pagedResult.hasContent()) {
            return ResponseEntity.status(HttpStatus.OK).body(pagedResult.getContent());
        }
		else {
			return ResponseEntity.status(HttpStatus.OK).body(new ArrayList<Instance>());
		}
	}

	@Override
	public ResponseEntity<Instance> freeInstance(Long instanceId, Employee employee) {
		Instance instanceToBeFree = null; 
		InstancesHistory instancesHistory = new InstancesHistory();
		try {
			instanceToBeFree = instanceDao.findById(instanceId).get();
			instanceToBeFree.setEmployee(null);
			instanceToBeFree.setInstanceReason(null);
			instanceToBeFree.setDeletedOn(LocalDateTime.now());
			instanceToBeFree.setIsInstanceAvailable(true);
			
			instanceDao.save(instanceToBeFree);
			
			instancesHistory.setEmployee(employee);
			instancesHistory.setHistoryLabel("Freeing up Instance");
			instancesHistory.setHistoryTime(LocalDateTime.now());
			
			instanceHistoryService.createHistoryForInstance(instancesHistory);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(instanceToBeFree);
		}
		return ResponseEntity.status(HttpStatus.OK).body(instanceToBeFree);
	}

	@Override
	public ResponseEntity<Instance> occupyInstance(Long instanceId, Employee employee, String reason) {
		Instance instanceToOccupy = null;
		InstancesHistory instancesHistory = new InstancesHistory();
		try {
			instanceToOccupy = instanceDao.findById(instanceId).get();
			if (instanceToOccupy.getIsInstanceAvailable() == false) {
				return ResponseEntity.status(HttpStatus.FORBIDDEN).body(instanceToOccupy);
			}
			instanceToOccupy.setEmployee(employee);
			instanceToOccupy.setCreatedOn(LocalDateTime.now());
			instanceToOccupy.setDeletedOn(null);
			instanceToOccupy.setIsInstanceAvailable(false);
			
			instanceDao.save(instanceToOccupy);
			
			instancesHistory.setEmployee(employee);
			instancesHistory.setHistoryLabel("Occupying Instance");
			instancesHistory.setHistoryTime(LocalDateTime.now());
			instancesHistory.setHistoryReason(reason);
			
			instanceHistoryService.createHistoryForInstance(instancesHistory);
			
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(instanceToOccupy);
		}
		return ResponseEntity.status(HttpStatus.OK).body(instanceToOccupy);
	}	
}
