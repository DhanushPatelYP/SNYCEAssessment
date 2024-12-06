package com.SNYCE.Project.DTO;

import java.util.List;

public class AssignRequest {
    private List<Integer> assessmentId;
    private String userId;

    public List<Integer> getAssessmentId() {
        return assessmentId;
    }

    public void setAssessmentId(List<Integer> assessmentId) {
        this.assessmentId = assessmentId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
