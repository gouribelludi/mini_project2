package com.neuropain.care.controller;


import com.neuropain.care.dto.*;
import com.neuropain.care.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ApiController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping("/pain-assessment")
    public CarePlanResponse assessPain(@RequestBody PainAssessmentRequest request) {
        return geminiService.generateCarePlan(request);
    }

    @PostMapping("/chat")
    public ChatResponse chat(@RequestBody ChatRequest request) {
        return geminiService.chat(request);
    }
}

