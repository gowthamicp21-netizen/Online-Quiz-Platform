package com.prakashamaana.onlineQuizPlatform.model.dto;

import lombok.Data;

import java.util.List;

@Data
public class QuestionResponse {

    private Integer id;
    private String questionText;
    private String difficulty;
    private Integer marks;

    private List<OptionResponse> options;
}