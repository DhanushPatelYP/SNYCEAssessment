package com.SNYCE.Project.DTO;

import com.SNYCE.Project.model.Topic;
import com.SNYCE.Project.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class QuestionRequest {

    private String description;
    private List<String> options;
    private String correctOption;
    private Integer marks;




    private String topic;


    public String getDescription() {
        return description;
    }


    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }

    public String getCorrectOption() {
        return correctOption;
    }

    public void setCorrectOption(String correctOption) {
        this.correctOption = correctOption;
    }

    public Integer getMarks() {
        return marks;
    }

    public void setMarks(Integer marks) {
        this.marks = marks;
    }


    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

}
