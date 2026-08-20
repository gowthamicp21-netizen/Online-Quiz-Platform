package com.prakashamaana.onlineQuizPlatform.model.dto;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="User_Quiz_Results")
@Data
public class QuizResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Long userId;

    private Integer quizId;

    private Integer wrongAnswers;

    private Integer correctAnswers;

    private Integer unanswered;

    private Integer percentage;

    private String result;

}
