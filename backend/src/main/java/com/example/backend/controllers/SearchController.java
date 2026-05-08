package com.example.backend.controllers;

import com.example.backend.dto.HolidayResponseDto;
import com.example.backend.dto.SearchRequestDto;
import com.example.backend.services.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/search")
@CrossOrigin(origins = "*")
public class SearchController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping
    public ResponseEntity<?> searchHolidays(@RequestBody SearchRequestDto requestDto) {
        try {
            HolidayResponseDto result = geminiService.generateHolidayPlan(requestDto);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            System.err.println("Search error: " + e.getMessage());
            return ResponseEntity.internalServerError()
                    .body("{\"error\": \"Failed to generate plan: " + e.getMessage().replace("\"", "'") + "\"}");
        }
    }
}
