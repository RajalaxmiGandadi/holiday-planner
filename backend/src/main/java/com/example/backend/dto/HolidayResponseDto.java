package com.example.backend.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
@Builder
public class HolidayResponseDto {
    private String destinationCity;
    private String country;
    private String lat;
    private String lon;
    private WeatherSummary weather;
    private List<FlightOption> flights;
    private List<HotelOption> hotels;
    private List<AttractionOption> attractions;
    private String message;

    @Data
    @Builder
    public static class AttractionOption {
        private String name;
        private String description;
        private String image;
        private String url;
    }

    @Data
    @Builder
    public static class WeatherSummary {
        private String temperature;
        private String description;
        private String icon;
    }

    @Data
    @Builder
    public static class FlightOption {
        private String airline;
        private String price;
        private String time;
        private String duration;
    }

    @Data
    @Builder
    public static class HotelOption {
        private String name;
        private String price;
        private String rating;
        private String image;
        private String url;
    }
}
