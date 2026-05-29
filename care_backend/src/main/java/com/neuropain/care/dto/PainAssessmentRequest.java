package com.neuropain.care.dto;



public class PainAssessmentRequest {
    private String bodyPart;
    private int painLevel;
    private String sensation;
    private String timing;
    private String details;

    public String getBodyPart() { return bodyPart; }
    public void setBodyPart(String bodyPart) { this.bodyPart = bodyPart; }
    public int getPainLevel() { return painLevel; }
    public void setPainLevel(int painLevel) { this.painLevel = painLevel; }
    public String getSensation() { return sensation; }
    public void setSensation(String sensation) { this.sensation = sensation; }
    public String getTiming() { return timing; }
    public void setTiming(String timing) { this.timing = timing; }
    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
}

