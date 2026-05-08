package com.example.backend.dto;

import lombok.Data;

@Data
public class SearchRequestDto {
    private String currentCity;
    private String destinationCity;
    private String startDate;
    private String endDate;
    private int adults;
    private int kids;
    private String vibe;
    private int budget;
}
