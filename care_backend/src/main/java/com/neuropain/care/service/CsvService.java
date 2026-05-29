package com.neuropain.care.service;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Service
public class CsvService {

    public String findMatchingHistoricalData(String bodyPart) {
        List<String> matchedRecords = new ArrayList<>();
        try {
            ClassPathResource resource = new ClassPathResource("pain.csv");
            if (!resource.exists()) {
                return "No historical CSV dataset available.";
            }

            BufferedReader br = new BufferedReader(new InputStreamReader(resource.getInputStream()));
            String line;
            int count = 0;

            // Read lines and look for matches
            while ((line = br.readLine()) != null && count < 5) {
                // If the CSV row contains the body part (case insensitive)
                if (line.toLowerCase().contains(bodyPart.toLowerCase())) {
                    matchedRecords.add(line);
                    count++;
                }
            }
            br.close();
        } catch (Exception e) {
            System.err.println("Error reading CSV: " + e.getMessage());
        }

        if (matchedRecords.isEmpty()) {
            return "No previous cases matched the body part '" + bodyPart + "'.";
        }
        return String.join("\n", matchedRecords);
    }
}

