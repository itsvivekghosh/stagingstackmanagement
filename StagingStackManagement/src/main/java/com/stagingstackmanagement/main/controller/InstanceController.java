package com.stagingstackmanagement.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.stagingstackmanagement.main.entities.Employee;
import com.stagingstackmanagement.main.entities.Instance;
import com.stagingstackmanagement.main.entities.InstancesHistory;
import com.stagingstackmanagement.main.services.InstanceHistoryService;
import com.stagingstackmanagement.main.services.InstanceService;

@Controller
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class InstanceController {
	
	@Autowired
	private InstanceService instanceService;
	
	@Autowired
	private InstanceHistoryService instanceHistoryService;
	
	public InstanceController() {
		instanceService = null;
	}

	@GetMapping(path = "/instances")
	@ResponseBody
	public ResponseEntity<List<Instance>> getInstances(
			@RequestParam(defaultValue = "0") Integer pageNo, 
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(defaultValue = "createdOn") String sortBy
			) {
//		return this.instanceService.findAllOrderByCreatedOn(pageNo, pageSize, sortBy);
		return this.instanceService.getInstances();
	}
	
	@GetMapping(path = "/instances/{instanceId}")
	@ResponseBody
	public ResponseEntity<Instance> getInstance(@PathVariable String instanceId) {
		return this.instanceService.getInstance(Long.parseLong(instanceId));
	}
	
	@PostMapping(path = "/instances", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<Instance> addInstance(@RequestBody Instance instance) {
		return this.instanceService.addInstance(instance);
	}
	
	@Modifying
	@PutMapping(path = "/instances/{instanceId}", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<Instance> updateInstance(
			@RequestBody Instance instance, 
			@PathVariable Long instanceId
			) {
		return this.instanceService.updateInstance(instance, instanceId);
	}
	
	@Modifying
	@DeleteMapping(path = "/instances/{instanceId}")
	@ResponseBody
	public ResponseEntity<Instance> deleteEntity(@PathVariable String instanceId) {
		return this.instanceService.deleteInstance(Long.parseLong(instanceId));
	}
	
	@RequestMapping(path = "/instances/search")
	@ResponseBody
	public ResponseEntity<List<Instance>> searchEntityByName(
			@RequestParam(value = "instaceName") String instaceName
			) {
		return this.instanceService.findByInstanceName(instaceName);
	}
	
	@Modifying
	@PutMapping(path = "/instances/free-instance", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<Instance> freeInstance(
			@RequestParam(value = "instanceId") String instanceId, 
			@RequestBody Employee employee
			) {
		return this.instanceService.freeInstance(Long.parseLong(instanceId), employee);
	}
	
	@Modifying
	@PutMapping(path = "/instances/occupy-instance", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<Instance> occupyInstance(
			@RequestParam(value = "instanceId") String instanceId,
			@RequestBody Employee employee,
			@RequestParam(value = "instanceReason") String instanceReason
			) {
		return this.instanceService.occupyInstance(
				Long.parseLong(instanceId), 
				employee, 
				instanceReason == null ? null : instanceReason 
			);
	}
	
	@RequestMapping(path = "/instances/history")
	@ResponseBody
	public ResponseEntity<List<InstancesHistory>> showHistory(
			@RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(defaultValue = "historyTime") String sortBy
			) {
//		return this.instanceHistoryService.getHistoryForInstances(pageNo, pageSize, sortBy);
		return this.instanceHistoryService.getInstancesHistory();
	}
}
