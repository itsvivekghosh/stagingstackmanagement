/**
 * 
 */
package com.stagingstackmanagement.main.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.stagingstackmanagement.main.entities.InstancesHistory;

/**
 * @author asus
 *
 */
public interface InstanceHistoryService {
	public ResponseEntity<List<InstancesHistory>> getInstancesHistory();
	public ResponseEntity<InstancesHistory> createHistoryForInstance(InstancesHistory instancesHistory);
	public ResponseEntity<List<InstancesHistory>> getHistoryForInstances(Integer pageNo, Integer pageSize, String sortBy);
}
