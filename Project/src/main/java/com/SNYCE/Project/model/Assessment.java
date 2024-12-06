package com.SNYCE.Project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
@Entity
public class Assessment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String assessmentName;
    private int topicId;
    private List<Integer> questionIdList;

    @ManyToMany(mappedBy = "assessmentList",cascade = CascadeType.PERSIST)
    @JsonIgnore
    private List<User> userList = new ArrayList<>();

    public List<User> getUserList() {
        return userList;
    }

    public void setUserList(List<User> userList) {
        this.userList = userList;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAssessmentName() {
        return assessmentName;
    }

    public void setAssessmentName(String assessmentName) {
        this.assessmentName = assessmentName;
    }

    public int getTopicId() {
        return topicId;
    }

    public void setTopicId(int topicId) {
        this.topicId = topicId;
    }

    public List<Integer> getQuestionIdList() {
        return questionIdList;
    }

    public void setQuestionIdList(List<Integer> questionIdList) {
        this.questionIdList = questionIdList;
    }
}
