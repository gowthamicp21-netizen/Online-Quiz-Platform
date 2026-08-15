package com.prakashamaana.onlineQuizPlatform.controller;

import com.prakashamaana.onlineQuizPlatform.model.Question;
import com.prakashamaana.onlineQuizPlatform.model.Quiz;
import com.prakashamaana.onlineQuizPlatform.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/quizzes")
@CrossOrigin(origins = "http://localhost:5173")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @GetMapping("/{id}/questions")
    public ResponseEntity<List<Question>> getQuestions(@PathVariable int id){
        List<Question> questions=quizService.getQuestions(id);
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @PostMapping("/{id}/questions")
    public  ResponseEntity<String> addQuestionToTheQuiz(@PathVariable int id, @RequestBody Question question){
        quizService.addQuestion(id,question);
        return new ResponseEntity<>("Question added successfully",HttpStatus.OK);
    }

    @PostMapping("/createQuiz")
    public ResponseEntity<String> createQuiz(@RequestBody Quiz quiz){
        quizService.createQuiz(quiz);
        return new ResponseEntity<>("Quiz created successfully", HttpStatus.OK);
    }


}
