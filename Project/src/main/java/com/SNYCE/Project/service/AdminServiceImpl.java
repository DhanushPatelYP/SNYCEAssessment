package com.SNYCE.Project.service;

import com.SNYCE.Project.model.Assessment;
import com.SNYCE.Project.model.Question;
import com.SNYCE.Project.model.Topic;
import com.SNYCE.Project.model.User;
import com.SNYCE.Project.repository.AssessmentRepository;
import com.SNYCE.Project.repository.QuestionRepository;
import com.SNYCE.Project.repository.TopicRepository;
import com.SNYCE.Project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Arrays;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    public TopicRepository topicRepository;
    @Autowired
    public QuestionRepository questionRepository;
    @Autowired
    public UserRepository userRepository;
    @Autowired
    public AssessmentRepository assessmentRepository;


    @Override
    public Topic createTopic(String name) {
        Topic topic = new Topic();
        topic.setName(name);

        return topicRepository.save(topic);
    }

    @Override
    public List<Topic> getAllTopics() {
        return topicRepository.findAll();
    }

    @Override
    public Question createQuestion(String description, List<String> options, String correctOption, Integer marks, Integer topic) {
        Question question = new Question();
        question.setTopic(topicRepository.findById(topic).orElseThrow());
        question.setDescription(description);
        question.setOptions(options);
        question.setCorrectOption(correctOption);
        question.setMarks(marks);
        return questionRepository.save(question);
    }

    @Override
    public List<Question> getQuestions() {
        return questionRepository.findAll();
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAllByRole("CANDIDATE");
    }

    @Override
    public List<Question> getTopicQuestions(Integer topicId) {
        return questionRepository.getTopicQuestions(topicId);
    }

    @Override
    public Assessment createAssessment(String assessmentName, Integer topicId, List<Integer> questionIdList) {
        Assessment assessment = new Assessment();
        assessment.setAssessmentName(assessmentName);
        assessment.setTopicId(topicId);
        assessment.setQuestionIdList(questionIdList);
        return assessmentRepository.save(assessment);
    }

    @Override
    public String assignAssessment(List<Integer> assessmentId, String userId) {
        User user = userRepository.findById(Integer.valueOf(userId)).orElseThrow();
        List<Assessment> assessment = assessmentRepository.findAllById(assessmentId);
        for (Assessment a:assessment) {

            if (user.getAssessmentList().contains(a)) {
                System.out.println("Skipping assessment with ID " + a.getId());
                continue;
            }

            user.getAssessmentList().add(a);
            a.getUserList().add(user);
            userRepository.save(user);
            assessmentRepository.save(a);
        }
        return "Assigned Successfully";

    }

    @Override
    public List<Assessment> getAssessments(Integer topicId) {
        return assessmentRepository.findByTopicId(topicId);
    }


//    @Override
//    public List<Question> topicquestionlist(Integer topicId){
//    return questionRepository.findById(topicId);
//    }
}
