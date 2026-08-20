package com.prakashamaana.onlineQuizPlatform.controller;

import com.prakashamaana.onlineQuizPlatform.model.Question;
import com.prakashamaana.onlineQuizPlatform.model.Quiz;
import com.prakashamaana.onlineQuizPlatform.model.User;
import com.prakashamaana.onlineQuizPlatform.model.dto.QuizResult;
import com.prakashamaana.onlineQuizPlatform.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/quizzes")
public class QuizAdminController {

    @Autowired
    private QuizService quizService;

    @GetMapping("/category/{categoryId}")
    public List<Quiz> getQuizByCategory(@PathVariable Integer categoryId){
        List<Quiz> quizzes =quizService.getQuizByCategory(categoryId);
        return quizzes;
    }

    @GetMapping("/quiz/{quizId}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable Integer quizId){
        Quiz quiz=quizService.getQuizById(quizId);
        return new ResponseEntity<>(quiz,HttpStatus.OK);
    }

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
        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
        quizService.createQuiz(quiz,username);
        return new ResponseEntity<>("Quiz created successfully", HttpStatus.OK);
    }

    @DeleteMapping("/delete/{quizId}")
    public ResponseEntity<String> deleteQuiz(@PathVariable int quizId){
        quizService.deleteQuiz(quizId);
        return new ResponseEntity<>("Quiz deleted successfully",HttpStatus.OK);
    }

    @PutMapping("/{quizId}")
    public ResponseEntity<String> updateQuiz(@PathVariable int quizId,@RequestBody Quiz quiz){
        quizService.updateQuiz(quizId,quiz);
        return new ResponseEntity<>("Quiz updated",HttpStatus.OK);
    }

    @GetMapping("/quizResult/{userId}")
    public ResponseEntity<List<QuizResult>> getQuizResultByUserId(@PathVariable Long userId){
        List<QuizResult> list=quizService.getQuizResultByUserId(userId);
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        System.out.println("Fetching users");
        return ResponseEntity.ok(
                quizService.getAllUsers()
        );
    }

}
