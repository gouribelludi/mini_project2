package com.neuropain.care.dto;

import java.util.List;

public class Recommendation {
    private String title;
    private List<String> tips;
    private String color;

    public Recommendation() {}
    public Recommendation(String title, List<String> tips, String color) {
        this.title = title;
        this.tips = tips;
        this.color = color;
    }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public List<String> getTips() { return tips; }
    public void setTips(List<String> tips) { this.tips = tips; }
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
}

