package com.neuropain.care.dto;

import java.util.List;

public class CarePlanResponse {
    private List<Recommendation> recommendations;
    public CarePlanResponse() {}
    public CarePlanResponse(List<Recommendation> recommendations) {
        this.recommendations = recommendations;
    }
    public List<Recommendation> getRecommendations() { return recommendations; }
    public void setRecommendations(List<Recommendation> recommendations) { this.recommendations = recommendations; }
}

