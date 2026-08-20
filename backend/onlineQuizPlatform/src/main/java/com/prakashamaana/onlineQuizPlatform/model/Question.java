package com.prakashamaana.onlineQuizPlatform.model;


import com.prakashamaana.onlineQuizPlatform.model.dto.QuestionDifficulty;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name="Questions")
@Data
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false,unique = true)
    private String questionText;

    @Enumerated(EnumType.STRING)
    private QuestionDifficulty difficulty;

    private Integer marks;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
