package com.SNYCE.Project.controller;

import com.SNYCE.Project.DTO.*;
import com.SNYCE.Project.model.Assessment;
import com.SNYCE.Project.model.Question;
import com.SNYCE.Project.model.Topic;
import com.SNYCE.Project.model.User;
import com.SNYCE.Project.repository.TopicRepository;
import com.SNYCE.Project.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin

public class AdminController {
    @Autowired
    public AdminService adminService;
    @Autowired
    public TopicRepository topicRepository;

    @PostMapping("/create_topic")
    public Topic createTopic(@RequestBody TopicRequest topicRequest){
        return adminService.createTopic(topicRequest.getName());
    }

    @GetMapping("/get_topics")
    public List<Topic> getAllTopics(){
        return adminService.getAllTopics();
    }


    @PostMapping("/create_question")
    public Question createQuestion(@RequestBody QuestionRequest questionRequest){
        return (adminService.createQuestion(
                questionRequest.getDescription(),
                questionRequest.getOptions(),
                questionRequest.getCorrectOption(),
                questionRequest.getMarks(),
                topicRepository.findIdByName(questionRequest.getTopic())
        ));
    }
    @GetMapping("/questions")
    public List<Question> getQuestions() {
        return adminService.getQuestions();
    }

    @PostMapping("/get_topic_questions")
    public List<Question> getTopicQuestions(@RequestBody TopicRequest topicRequest){
        Topic topic = topicRepository.findByName(topicRequest.getName());
        return adminService.getTopicQuestions(topic.getId());
    }

    @GetMapping("/get_candidates")
    public List<User> getAllUsers(){return adminService.getAllUsers();}


    @PostMapping("/create_assessment")
    public Assessment createAssessment(@RequestBody AssessmentRequest assessmentRequest){
        return adminService.createAssessment(
                assessmentRequest.getAssessmentName(),
                topicRepository.findIdByName(assessmentRequest.getTopic()),
                assessmentRequest.getQuestionIdList()
        );
    }

    @PostMapping("/get_topic_assessments")
    public List<Assessment> getAssessments(@RequestBody TopicAssessmentRequest topicAssessmentRequest){
        return adminService.getAssessments(topicRepository.findIdByName(topicAssessmentRequest.getTopicName()));
    }


    @PostMapping("/assign_assessment")
    public String assignAssessment(@RequestBody AssignRequest assignRequest){
        return adminService.assignAssessment(
                assignRequest.getAssessmentId(),
                assignRequest.getUserId());
    }


//    @GetMapping("/topicquestionlist")
//    public List<Question> topicquestionlist(
//            @RequestParam Integer topicId
//    ) {
//        return adminService.topicquestionlist(topicId);
//    }
}
