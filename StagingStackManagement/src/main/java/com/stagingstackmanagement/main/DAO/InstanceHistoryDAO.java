/**
 * @author Vivek Kumar Ghosh
 *
 */
package com.stagingstackmanagement.main.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.stagingstackmanagement.main.entities.InstancesHistory;

public interface InstanceHistoryDAO extends JpaRepository<InstancesHistory, Long>, PagingAndSortingRepository<InstancesHistory, Long> {
	
}