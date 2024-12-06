package com.SNYCE.Project.repository;

import com.SNYCE.Project.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question,Integer> {

//    @Query("SELECT q FROM Question q JOIN FETCH q.topic WHERE q.id = :id")
    @Query("SELECT q FROM Question q WHERE q.topic.id = :topicId")
    public List<Question> getTopicQuestions(@Param("topicId") Integer topicId);
}
