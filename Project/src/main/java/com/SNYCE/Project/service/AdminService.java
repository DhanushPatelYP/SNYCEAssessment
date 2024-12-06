package com.SNYCE.Project.service;

import com.SNYCE.Project.model.Assessment;
import com.SNYCE.Project.model.Question;
import com.SNYCE.Project.model.Topic;
import com.SNYCE.Project.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AdminService {
    Topic createTopic(String name);
    List<Topic> getAllTopics();
    Question createQuestion(String description, List<String> options,String correctOption,Integer marks,Integer topic);
    List<Question> getQuestions();
    List<User> getAllUsers();
    List<Question> getTopicQuestions(Integer topicId);
    Assessment createAssessment(String assessmentName,Integer topicId,List<Integer> questionIdList);
    String assignAssessment(List<Integer> assessmentId,String userId);
    List<Assessment> getAssessments(Integer topicId);
//    List<Question> topicquestionlist(Integer topicId);
}
