package com.SNYCE.Project.service;

import com.SNYCE.Project.model.Assessment;
import com.SNYCE.Project.model.User;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;

public interface UserService {
    User saveUser(String username,String password,String role);
    User getUserDetails(String username,String password);
    List<Assessment> getUserAssessments(Integer userId);
    Map<String, Object> getAssessment(Integer assessmentId);
    void testCompleted(Integer userId,Integer topicId,Integer assessmentId,Integer totalMarks,Integer ObtainedMarks);
    Map<String, Object> getResults(Integer userId);
    Map<String, Object> getPendingAssessments(Integer userId);
}
