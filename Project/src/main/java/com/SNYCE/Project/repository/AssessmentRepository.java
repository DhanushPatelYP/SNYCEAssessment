package com.SNYCE.Project.repository;

import com.SNYCE.Project.model.Assessment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssessmentRepository extends JpaRepository<Assessment,Integer> {
    public List<Assessment> findByTopicId(Integer topicId);
}
