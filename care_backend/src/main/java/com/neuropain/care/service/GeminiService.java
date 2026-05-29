package com.neuropain.care.service;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.neuropain.care.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Autowired
    private CsvService csvService;

    private final HttpClient httpClient = HttpClient.newHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public CarePlanResponse generateCarePlan(PainAssessmentRequest request) {
        // 1. Fetch matching historical case records from Kaggle CSV
        String historicalCases = csvService.findMatchingHistoricalData(request.getBodyPart());

        System.out.println("********");
        // 2. Build the grounded medical prompt
        String prompt = String.format(
                "You are an empathetic pain management specialist AI. Analyze the patient's symptoms: " +
                        "Body Part: %s, Pain Level: %d/10, Sensation Type: %s, Timing: %s, Details: %s.\n\n" +
                        "Use these historical matching data points from the clinical Flaredown database if relevant:\n%s\n\n" +
                        "Formulate clinical suggestions for relief. Your output must strictly follow WHO guidelines for non-pharmacological care.\n" +
                        "Generate a JSON response matching this exact structure (no markdown backticks, no comments, only raw JSON):\n" +
                        "{\n" +
                        "  \"recommendations\": [\n" +
                        "    { \"title\": \"Immediate Relief\", \"tips\": [\"tip 1\", \"tip 2\"], \"color\": \"#38bdf8\" },\n" +
                        "    { \"title\": \"Lifestyle Adjustments\", \"tips\": [\"tip 1\", \"tip 2\"], \"color\": \"#818cf8\" }\n" +
                        "  ]\n" +
                        "}",
                request.getBodyPart(), request.getPainLevel(), request.getSensation(), request.getTiming(), request.getDetails(), historicalCases
        );

        try {
            String jsonResponse = callGeminiApi(prompt);
            System.out.println("jsonResponse"+jsonResponse);
            return objectMapper.readValue(jsonResponse, CarePlanResponse.class);
        } catch (Exception e) {
            e.printStackTrace();
            // Secure fallback
            return new CarePlanResponse(List.of(
                    new Recommendation("Immediate Relief (Fallback)", List.of("Apply heat or cold compression.", "Perform light stretches."), "#38bdf8"),
                    new Recommendation("Lifestyle Adjustments (Fallback)", List.of("Stay hydrated", "Avoid strenuous movements."), "#818cf8")
            ));
        }
    }

    public ChatResponse chat(ChatRequest request) {
        String prompt = String.format(
                "You are an expert chronic pain AI chatbot aligned with World Health Organization rules. " +
                        "Answer the query: \"%s\". Provide safe, empathetic advice. " +
                        "Format your reply as a JSON response with only one field like: {\"response\": \"your explanation here\"}. " +
                        "No markdown, no comments.",
                request.getMessage()
        );

        try {
            String jsonResponse = callGeminiApi(prompt);
            Map<String, String> map = objectMapper.readValue(jsonResponse, Map.class);
            return new ChatResponse(map.getOrDefault("response", "I'm having trouble retrieving a response."));
        } catch (Exception e) {
            e.printStackTrace();
            return new ChatResponse("I am sorry, I am currently offline. Please check your network.");
        }
    }

    private String callGeminiApi(String prompt) throws Exception {
        String url =
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key="
                        + apiKey;
        Map<String, Object> textPart = Map.of("text", prompt);
        Map<String, Object> parts = Map.of("parts", List.of(textPart));
        Map<String, Object> content = Map.of("contents", List.of(parts));
        String requestBody = objectMapper.writeValueAsString(content);

        HttpRequest httpRequest = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        HttpResponse<String> response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() == 200) {
            Map<String, Object> responseMap = objectMapper.readValue(response.body(), Map.class);
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) responseMap.get("candidates");
            String rawText = (String) ((List<Map<String, Object>>) ((Map<String, Object>) candidates.get(0).get("content")).get("parts")).get(0).get("text");

            // Sanitize markdown blocks if Gemini formats them as code blocks
            return rawText.replaceAll("```json", "").replaceAll("```", "").trim();
        }
           else {
                System.out.println(response.body());

                throw new RuntimeException(
                        "Gemini API call failed with code "
                                + response.statusCode()
                );
            }}

}

