package com.SNYCE.Project.controller;

import com.SNYCE.Project.DTO.LoginRequest;
import com.SNYCE.Project.DTO.TestCompletedRequest;
import com.SNYCE.Project.DTO.UserRequest;
import com.SNYCE.Project.model.Assessment;
import com.SNYCE.Project.model.Result;
import com.SNYCE.Project.model.User;
import com.SNYCE.Project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    @Autowired
    public UserService userService;

    @PostMapping("/addUser")
    public String addUser(@RequestBody UserRequest userRequest){
        userService.saveUser(
                userRequest.getUsername(),
                userRequest.getPassword(),
                userRequest.getRole()
        );
        return "Added user";
    }
    @PostMapping("/login")
    public User getUserDetails(@RequestBody LoginRequest loginRequest){
        return userService.getUserDetails(
                loginRequest.getUsername(),
                loginRequest.getPassword()
        );
    }

    @GetMapping("/get_user_assessments")
    public List<Assessment> getUserAssessments(@RequestParam int userId){
        return userService.getUserAssessments(userId);
    }

    @GetMapping("/get_assessment")
    public Map<String, Object> getAssessment(@RequestParam int assessmentId){
        return userService.getAssessment(assessmentId);
    }
    @PostMapping("/test_completed")
    public String testCompleted(@RequestBody TestCompletedRequest testCompletedRequest){
        userService.testCompleted(
                testCompletedRequest.getUserId(),
                testCompletedRequest.getTopicId(),
                testCompletedRequest.getAssessmentId(),
                testCompletedRequest.getTotalMarks(),
                testCompletedRequest.getObtainedMarks()
        );
        return "";
    }
    @PostMapping("/get_results")
    public Map<String, Object> getResults(@RequestParam int userId){
        return userService.getResults(userId);
    }

    @PostMapping("/get_pending_assessments")
    public Map<String, Object> getPendingAssessments(@RequestParam int userId){
        return userService.getPendingAssessments(userId);
    }
}
