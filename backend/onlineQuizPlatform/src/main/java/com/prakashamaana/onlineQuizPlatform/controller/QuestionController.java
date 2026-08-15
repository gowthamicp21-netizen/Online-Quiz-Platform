package com.prakashamaana.onlineQuizPlatform.controller;

import com.prakashamaana.onlineQuizPlatform.model.Question;
import com.prakashamaana.onlineQuizPlatform.model.Question_Option;
import com.prakashamaana.onlineQuizPlatform.model.dto.QuestionRequest;
import com.prakashamaana.onlineQuizPlatform.model.dto.UpdateQuestionRequest;
import com.prakashamaana.onlineQuizPlatform.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/questions")
@CrossOrigin(origins = "http://localhost:5173")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @GetMapping("/{questionId}")
    public ResponseEntity<Question> getQuestionById(@PathVariable int questionId){
        Question question=questionService.getQuestionById(questionId);
        return new ResponseEntity<>(question,HttpStatus.OK);
    }

    @PostMapping("/addOptions")
    public ResponseEntity<?> addOptions( @RequestBody List<Question_Option> questionOptions){
        questionService.addOptions(questionOptions);
        return new ResponseEntity<>("Options also added",HttpStatus.OK);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<?> getQuestionByCategory(@PathVariable int categoryId){
            List<Question> questions=questionService.getQuestionByCategory(categoryId);

            return new ResponseEntity<>(questions,HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateQuestion(@RequestBody UpdateQuestionRequest request, @PathVariable Integer id){

        questionService.updateQuestion(request.getQuestion(),request.getOptions(), id);
        return new ResponseEntity<>("Updated",HttpStatus.OK);
    }

    @PostMapping("/addQuestions")
    public ResponseEntity<Question> addQuestion(@RequestBody Question questionRequest){
        System.out.println(questionRequest.getQuestionText());
        Question response=questionService.addQuestion(questionRequest);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteQuestion(@PathVariable Integer id){
        questionService.deleteQuestion(id);
        return new ResponseEntity<>("Deleted",HttpStatus.OK);
    }
}
