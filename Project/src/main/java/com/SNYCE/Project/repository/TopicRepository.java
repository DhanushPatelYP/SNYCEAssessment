package com.SNYCE.Project.repository;

import com.SNYCE.Project.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TopicRepository extends JpaRepository<Topic,Integer> {
    public Topic findByName(String name);

    @Query("SELECT t.id FROM Topic t WHERE t.name=:name")
    public Integer findIdByName(@Param("name") String name);
}
