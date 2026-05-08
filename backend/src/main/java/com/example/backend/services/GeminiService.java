package com.example.backend.services;

import com.example.backend.dto.HolidayResponseDto;
import com.example.backend.dto.SearchRequestDto;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final String BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/";
    private static final String[] MODELS = {
        "gemini-3-flash-preview",
        "gemini-2.5-flash",
        "gemini-2.0-flash",
        "gemini-1.5-flash"
    };

    public GeminiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public HolidayResponseDto generateHolidayPlan(SearchRequestDto req) {
        String prompt = buildPrompt(req);
        String requestBody = """
            {
              "contents": [{
                "parts": [{"text": %s}]
              }],
              "generationConfig": {
                "responseMimeType": "application/json"
              }
            }
            """.formatted(objectMapper.valueToTree(prompt).toString());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new org.springframework.http.MediaType("application", "json", java.nio.charset.StandardCharsets.UTF_8));
        headers.setAcceptCharset(List.of(java.nio.charset.StandardCharsets.UTF_8));
        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        Exception lastException = null;
        for (String model : MODELS) {
            try {
                String url = BASE_URL + model + ":generateContent?key=" + apiKey;
                ResponseEntity<byte[]> response = restTemplate.exchange(
                        url,
                        HttpMethod.POST,
                        entity,
                        byte[].class
                );

                String body = new String(response.getBody(), java.nio.charset.StandardCharsets.UTF_8);
                JsonNode root = objectMapper.readTree(body);
                String jsonText = root
                        .path("candidates").get(0)
                        .path("content").path("parts").get(0)
                        .path("text").asText();

                return parseResponse(jsonText, req.getDestinationCity());

            } catch (org.springframework.web.client.HttpClientErrorException.TooManyRequests e) {
                System.out.println("Rate limit hit for model " + model + ", trying next one...");
                lastException = e;
            } catch (Exception e) {
                System.err.println("Error with model " + model + ": " + e.getMessage());
                lastException = e;
            }
        }
        
        throw new RuntimeException("All Gemini models failed. Last error: " + (lastException != null ? lastException.getMessage() : "Unknown"), lastException);
    }

    private String buildPrompt(SearchRequestDto req) {
        return """
            You are a travel planning assistant. A user wants to plan a holiday trip.

            User Input:
            - Traveling from: %s
            - Destination: %s
            - Start date: %s
            - End date: %s
            - Number of adults: %d
            - Number of kids: %d
            - Travel vibe: %s
            - Budget per person (in thousands INR): ₹%d,000

            Generate a comprehensive, realistic holiday plan for this trip. Use your real-world knowledge about the destination.

            Return ONLY a valid JSON object matching EXACTLY this structure (no markdown, no extra text):
            {
              "destinationCity": "string - city name",
              "country": "string - country name",
              "lat": "string - latitude",
              "lon": "string - longitude",
              "weather": {
                "temperature": "string e.g. +30°C",
                "description": "string e.g. Hot and sunny with clear skies"
              },
              "flights": [
                {
                  "airline": "string - real airline name that flies this route",
                  "price": "string - realistic price in INR e.g. ₹12,500",
                  "time": "string - e.g. 06:30 AM - 09:15 AM",
                  "duration": "string - e.g. 2h 45m"
                }
              ],
              "hotels": [
                {
                  "name": "string - real or realistic hotel name in destination",
                  "price": "string - realistic price in INR e.g. ₹7,500/night",
                  "rating": "string - e.g. 4.5",
                  "image": "string - a valid, working Unsplash photo URL for a hotel: https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
                  "url": "string - booking.com or google search URL for this hotel"
                }
              ],
              "attractions": [
                {
                  "name": "string - real attraction name",
                  "description": "string - 1 sentence description relevant to the vibe",
                  "image": "string - a valid Unsplash photo URL relevant to this type of place",
                  "url": "string - Wikipedia or official website URL"
                }
              ],
              "message": "string - a short, exciting 1-sentence summary of the trip"
            }

            Requirements:
            - Include at least 7 flight options
            - Include at least 7 hotel options
            - Include at least 7 top attractions that match the "%s" vibe
            - All prices must be in Indian Rupees (₹)
            - Use real airline names that actually fly the %s to %s route
            - Use real hotel names in %s
            - Use real attraction names in %s
            - Tailor recommendations to the travel vibe: %s
            - For Unsplash images, use these stable photo IDs based on category:
              * Hotels: photo-1566073771259-6a8506099945, photo-1520250497591-112f2f40a3f4, photo-1551882547-ff40c4a49f4a
              * Nature/Parks: photo-1441974231531-c6227db76b6e, photo-1506905925346-21bda4d32df4
              * Historical sites: photo-1548013146-72479768bbaa, photo-1524492412937-b28074a5d7da
              * Food/Markets: photo-1533900298318-6b8da08a523e, photo-1555396273-367ea4eb4db5
              * Museums/Culture: photo-1566127444979-b3d2b654e3d7, photo-1518998053901-5348d3961a04
              * Adventure/Sports: photo-1551698618-1dfe5d97d256, photo-1467632499275-7a693a761056
            """.formatted(
                req.getCurrentCity(), req.getDestinationCity(),
                req.getStartDate(), req.getEndDate(),
                req.getAdults(), req.getKids(),
                req.getVibe(), req.getBudget(),
                req.getVibe(),
                req.getCurrentCity(), req.getDestinationCity(),
                req.getDestinationCity(), req.getDestinationCity(),
                req.getVibe()
        );
    }

    @SuppressWarnings("unchecked")
    private HolidayResponseDto parseResponse(String jsonText, String fallbackCity) {
        try {
            JsonNode node = objectMapper.readTree(jsonText);

            // Weather
            JsonNode w = node.path("weather");
            HolidayResponseDto.WeatherSummary weather = HolidayResponseDto.WeatherSummary.builder()
                    .temperature(w.path("temperature").asText("N/A"))
                    .description(w.path("description").asText(""))
                    .build();

            // Flights
            List<HolidayResponseDto.FlightOption> flights = new ArrayList<>();
            for (JsonNode f : node.path("flights")) {
                flights.add(HolidayResponseDto.FlightOption.builder()
                        .airline(f.path("airline").asText())
                        .price(f.path("price").asText())
                        .time(f.path("time").asText())
                        .duration(f.path("duration").asText())
                        .build());
            }

            // Hotels
            List<HolidayResponseDto.HotelOption> hotels = new ArrayList<>();
            for (JsonNode h : node.path("hotels")) {
                hotels.add(HolidayResponseDto.HotelOption.builder()
                        .name(h.path("name").asText())
                        .price(h.path("price").asText())
                        .rating(h.path("rating").asText())
                        .image(h.path("image").asText())
                        .url(h.path("url").asText())
                        .build());
            }

            // Attractions
            List<HolidayResponseDto.AttractionOption> attractions = new ArrayList<>();
            for (JsonNode a : node.path("attractions")) {
                attractions.add(HolidayResponseDto.AttractionOption.builder()
                        .name(a.path("name").asText())
                        .description(a.path("description").asText())
                        .image(a.path("image").asText())
                        .url(a.path("url").asText())
                        .build());
            }

            return HolidayResponseDto.builder()
                    .destinationCity(node.path("destinationCity").asText(fallbackCity))
                    .country(node.path("country").asText(""))
                    .lat(node.path("lat").asText("0"))
                    .lon(node.path("lon").asText("0"))
                    .weather(weather)
                    .flights(flights)
                    .hotels(hotels)
                    .attractions(attractions)
                    .message(node.path("message").asText("Enjoy your trip!"))
                    .build();

        } catch (Exception e) {
            throw new RuntimeException("Failed to parse Gemini response: " + e.getMessage(), e);
        }
    }
}
