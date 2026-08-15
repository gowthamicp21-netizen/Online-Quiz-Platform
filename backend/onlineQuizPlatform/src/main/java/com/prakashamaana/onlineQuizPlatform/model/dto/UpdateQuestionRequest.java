package com.prakashamaana.onlineQuizPlatform.model.dto;



import com.prakashamaana.onlineQuizPlatform.model.Question;
import com.prakashamaana.onlineQuizPlatform.model.Question_Option;
import lombok.Data;
import java.util.List;

@Data
public class UpdateQuestionRequest {

    private Question question;

    private List<Question_Option> options;
}