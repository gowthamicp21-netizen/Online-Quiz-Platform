package com.prakashamaana.onlineQuizPlatform.model.dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;

@Getter
public class QuestionRequest {


    private String questionText;

    @Enumerated(EnumType.STRING)
    private QuestionDifficulty difficulty;

    private Integer marks;

    private Integer categoryId;

}
