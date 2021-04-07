package com.stagingstackmanagement.main.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.stagingstackmanagement.main.DAO.InstanceHistoryDAO;
import com.stagingstackmanagement.main.entities.InstancesHistory;

@Service
public class InstanceHistoryServiceImplementation implements InstanceHistoryService {

	@Autowired
	private InstanceHistoryDAO instanceHistoryDAO;
	
	@Override
	public ResponseEntity<InstancesHistory> createHistoryForInstance(InstancesHistory instancesHistory) {
		InstancesHistory history = new InstancesHistory();
		try {
			history = instanceHistoryDAO.save(instancesHistory);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(history);
		}
		return ResponseEntity.status(HttpStatus.OK).body(history);
	}

	@Override
	public ResponseEntity<List<InstancesHistory>> getHistoryForInstances(Integer pageNo, Integer pageSize, String sortBy) {
		// https://howtodoinjava.com/spring-boot2/pagination-sorting-example/
		Sort sortOrder = Sort.by(sortBy).descending(); 
		Pageable paging = PageRequest.of(pageNo, pageSize, sortOrder);
		 
        Page<InstancesHistory> pagedResult = instanceHistoryDAO.findAll(paging);
         
        if(pagedResult.hasContent()) {
            return ResponseEntity.status(HttpStatus.OK).body(pagedResult.getContent());
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ArrayList<InstancesHistory>());
        }
	}

	@Override
	public ResponseEntity<List<InstancesHistory>> getInstancesHistory() {
		List<InstancesHistory> listHistory = new ArrayList<InstancesHistory>();
		try {
			listHistory = instanceHistoryDAO.findAll();
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(listHistory);
		}
		return ResponseEntity.status(HttpStatus.OK).body(listHistory);
	}
}
