package com.stagingstackmanagement.main.specification;

import javax.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;
import com.stagingstackmanagement.main.entities.Instance;

/**
 * Instance Search Filter
 */
public class InstanceSpecification implements Specification<Instance> {

	
	private static final long serialVersionUID = 1L;
	private Instance filter;
	
	public InstanceSpecification(Instance filter) {
		super();
		this.filter = filter;
	}
	
	public Predicate toPredicate(Root<Instance> root, CriteriaQuery<?> cq,
			CriteriaBuilder cb) {
		
		Predicate p = cb.disjunction();

		if (filter.getInstanceName() != null) {
			p.getExpressions().add(cb.equal(root.get("name"), filter.getInstanceName()));
		}
		
//		if (filter.getSurname() != null && filter.getAge() != null) {
//			p.getExpressions().add(cb.and(
//						cb.equal(root.get("surname"), filter.getSurname()),
//						cb.equal(root.get("age"), filter.getAge())
//					));
//		}
		
		
		return p;
		
	}
}
