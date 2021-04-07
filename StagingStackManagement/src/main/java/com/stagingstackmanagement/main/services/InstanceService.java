package com.stagingstackmanagement.main.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.stagingstackmanagement.main.entities.Employee;
import com.stagingstackmanagement.main.entities.Instance;

public interface InstanceService {
	public ResponseEntity<List<Instance>> getInstances();
	public ResponseEntity<Instance> getInstance(Long instanceId);
	public ResponseEntity<Instance> addInstance(Instance instance);
	public ResponseEntity<Instance> updateInstance(Instance instance, Long instanceId);
	public ResponseEntity<Instance> deleteInstance(Long instanceId);
	public ResponseEntity<List<Instance>> findByInstanceName(String searchName);
	public ResponseEntity<Instance> freeInstance(Long instanceId, Employee employee);
	public ResponseEntity<Instance> occupyInstance(Long instanceId, Employee employee, String reason);
	public ResponseEntity<List<Instance>> findAllOrderByCreatedOn(Integer pageNo, Integer pageSize, String sortBy);
}
