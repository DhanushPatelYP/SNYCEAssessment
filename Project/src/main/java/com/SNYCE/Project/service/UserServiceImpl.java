package com.SNYCE.Project.service;

import com.SNYCE.Project.model.*;
import com.SNYCE.Project.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    public UserRepository userRepository;
    @Autowired
    public AssessmentRepository assessmentRepository;
    @Autowired
    public QuestionRepository questionRepository;
    @Autowired
    public TopicRepository topicRepository;
    @Autowired
    public ResultRepository resultRepository;

    @Override
    public User saveUser(String username,String password,String role){
        User user=new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setRole(role);

        return userRepository.save(user);
    }

    @Override
    public User getUserDetails(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }

    @Override
    public List<Assessment> getUserAssessments(Integer userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return user.getAssessmentList();
    }

    @Override
    public Map<String, Object> getAssessment(Integer assessmentId) {
        Assessment assessment = assessmentRepository.findById(assessmentId).orElseThrow();
        List<Question> questions = questionRepository.findAllById(assessment.getQuestionIdList());
        Map<String, Object> response = new HashMap<>();
        response.put("id",assessment.getId());
        response.put("assessmentName",assessment.getAssessmentName());
        response.put("topicId",assessment.getTopicId());
        response.put("questions",questions);

        return response;
    }

    @Override
    public void testCompleted(Integer userId, Integer topicId, Integer assessmentId, Integer totalMarks, Integer obtainedMarks) {

        User user = userRepository.findById(userId).orElseThrow();
        Assessment assessment = assessmentRepository.findById(assessmentId).orElseThrow();
        user.getAssessmentList().remove(assessment);
        assessment.getUserList().remove(user);
        userRepository.save(user);
        assessmentRepository.save(assessment);
        Topic topic = topicRepository.findById(topicId).orElseThrow();
        Result result = new Result();
        result.setUserId(userId);
        result.setTopicId(topicId);
        result.setAssessmentId(assessmentId);
        result.setObtainedMarks(obtainedMarks);
        result.setTotalMarks(totalMarks);
        resultRepository.save(result);

    }

    @Override
    public Map<String, Object> getResults(Integer userId) {
        List<Result> resultList = resultRepository.findAllByUserId(userId);
        Map<String, Object> response = new HashMap<>();

        for(Result r:resultList){
            Map<String, Object> data = new HashMap<>();
            data.put("totalMarks",r.getTotalMarks());
            data.put("obtainedMarks",r.getObtainedMarks());
            Assessment assessment = assessmentRepository.findById(r.getAssessmentId()).orElseThrow();
            data.put("assessmentName",assessment.getAssessmentName());
            Topic topic = topicRepository.findById(r.getTopicId()).orElseThrow();
            data.put("topicName",topic.getName());
            data.put("status","COMPLETED");
            response.put(String.valueOf(assessment.getId()),data);
        }
        return response;
    }

    @Override
    public Map<String, Object> getPendingAssessments(Integer userId) {
        User user = userRepository.findById(userId).orElseThrow();
        List<Assessment> assessmentList = user.getAssessmentList();
        Map<String, Object> response = new HashMap<>();
        for(Assessment a:assessmentList){
            Map<String, Object> data = new HashMap<>();
            data.put("assessmentName",a.getAssessmentName());
            Topic topic = topicRepository.findById(a.getTopicId()).orElseThrow();
            data.put("topicName",topic.getName());
            data.put("status","ASSIGNED/PENDING");
            response.put(String.valueOf(a.getId()),data);
        }
        return response;
    }

}



