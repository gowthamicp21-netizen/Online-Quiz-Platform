package com.prakashamaana.onlineQuizPlatform.controller;

import com.prakashamaana.onlineQuizPlatform.model.*;
import com.prakashamaana.onlineQuizPlatform.model.dto.OptionResponse;
import com.prakashamaana.onlineQuizPlatform.model.dto.QuestionResponse;
import com.prakashamaana.onlineQuizPlatform.model.dto.QuizResult;
import com.prakashamaana.onlineQuizPlatform.model.dto.SelectedAnswers;
import com.prakashamaana.onlineQuizPlatform.service.QuizStudentService;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/student/quizzes")
public class QuizStudentController {

    @Autowired
    private QuizStudentService quizStudentService;

    @GetMapping("/categories")
    public List<Category> getCategories(){
        return quizStudentService.getCategories();
    }


    @GetMapping("/discover")
    public List<Quiz> discover(@RequestParam(required = false) String search,
                               @RequestParam(required = false) Long categoryId,
                               @RequestParam(required = false) Difficulty difficulty,
                               @RequestParam(required = false) Integer duration,
                               @RequestParam(required = false)  String sort
                               ){
        List<Quiz> quizzes=quizStudentService.getQuizzesByQuizTitle(search,categoryId,difficulty,duration,sort);
        return quizzes;
    }

    @GetMapping("/{quizId}")
    public Quiz getQuiz(@PathVariable Integer quizId){
        Quiz quiz=quizStudentService.getQuiz(quizId);
        return  quiz;
    }

    @GetMapping("/questions/{quizId}")
    public List<QuestionResponse> getQuestions(@PathVariable Integer quizId){
        List<Question> questions=quizStudentService.getQuestions(quizId);
        List<QuestionResponse> questionResponses=new ArrayList<>();
        for(Question question :questions){
            QuestionResponse questionResponse=new QuestionResponse();
            List<Question_Option> options=quizStudentService.getQuestionOption(question.getId());
            questionResponse.setId(question.getId());
            questionResponse.setQuestionText(question.getQuestionText());
            questionResponse.setDifficulty(question.getDifficulty().toString());
            questionResponse.setMarks(question.getMarks());
            List<OptionResponse> optionResponses=new ArrayList<>();
            for(Question_Option option:options){
                OptionResponse optionResponse=new OptionResponse();
                optionResponse.setId(option.getId());
                optionResponse.setOption(option.getOption());
                optionResponses.add(optionResponse);
            }
            questionResponse.setOptions(optionResponses);
            questionResponses.add(questionResponse);
        }

        return questionResponses;
    }

    @PostMapping("/checkResult/{quizId}")
    public QuizResult checkQuizResult(@RequestBody List<SelectedAnswers> selectedAnswers, @PathVariable Integer quizId, Authentication authentication ){
        return quizStudentService.checkQuizResult(selectedAnswers,quizId,authentication);
    }

    @GetMapping("/my-results")
    public List<QuizResult> quizzesByUserId(Authentication authentication){
        System.out.println("Fetching quizzes by user");
        String userEmail = authentication.getName();
        return  quizStudentService.quizzesByUserId(userEmail);
    }



//    @GetMapping("/discover/category")
//    public List<Quiz> getQuizzesByCategory(@RequestParam String category){
//        List<Quiz> quizzes=quizStudentService.getQuizzesByCategory(category);
//        return  quizzes;
//    }

//    @GetMapping("/filter/difficulty")
//    public List<Quiz> getQuizzesByDifficulty(@RequestParam String difficulty, @RequestBody List<Quiz> quizzes){
//        List<Quiz> response=quizStudentService.getQuizzesByDifficulty(difficulty,quizzes);
//        return response;
//    }
//
//    @GetMapping("/filter/duration")
//    public List<Quiz> getQuizzesByDuraation(@RequestParam String duration,@RequestBody List<Quiz> quizzes){
//        List<Quiz> response=quizStudentService.
//    }

}
