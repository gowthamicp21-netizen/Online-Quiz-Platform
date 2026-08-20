package com.prakashamaana.onlineQuizPlatform.service;

import com.prakashamaana.onlineQuizPlatform.model.*;
import com.prakashamaana.onlineQuizPlatform.model.dto.QuizResult;
import com.prakashamaana.onlineQuizPlatform.model.dto.SelectedAnswers;
import com.prakashamaana.onlineQuizPlatform.repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuizStudentService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private CategoryRepository categoryRepo;

    @Autowired
    private QuestionRepository questionRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private QuestionOptionsRepository questionOptionsRepository;

    @Autowired
    private QuizResultRepository quizResultRepository;

    public List<Quiz> getQuizzesByQuizTitle(String search, Long categoryId, Difficulty difficulty, Integer duration, String sort) {
        List<Quiz> quizzes=new ArrayList<>();
        if(search!=null){
            quizzes=quizRepository.findByTitle(search);
        }
        if(categoryId!=null){
            Category category=categoryRepo.findById(categoryId);
            quizzes=quizRepository.findByCategory(category);
        }
        if(difficulty!=null){
            quizzes=quizRepository.findByDifficulty(difficulty);
        }
        if(duration!=null){
            quizzes=quizRepository.findByDuration(duration);
        }
        if(sort!=null){
            if(sort.equals("Recently Added")){
                quizzes=quizRepository.findAllByOrderByCreatedAtDesc();
            }
            else{
                quizzes=quizRepository.findAll();
            }
        }
        return quizzes;
    }

    public List<Category> getCategories() {
        return categoryRepo.findAll();
    }

    public Quiz getQuiz(Integer quizId) {
        return quizRepository.findById(quizId).get();
    }

    public List<Question> getQuestions(Integer quizId) {
        Quiz quiz=quizRepository.findById(quizId).get();
        return quiz.getQuestions();
    }

    public List<Question_Option> getQuestionOption(Integer questionId) {
        List<Question_Option> options=questionOptionsRepository.findAllByQuestionId(questionId);
        return options;
    }

    public QuizResult checkQuizResult(List<SelectedAnswers> selectedAnswers,Integer quizId, Authentication authentication) {
            int wrongAnswers=0;
            int correctAnwers=0;
            int  answeredCount = selectedAnswers.size();
            int totalMarks=0;
            int obtainedMarks=0;
        String email = authentication.getName();
        User user=userRepo.findByEmail(email).get();
        QuizResult quizResult=new QuizResult();
        quizResult.setUserId(user.getUser_id());
        Quiz quiz=quizRepository.findById(quizId).get();
        List<Question> questions=quiz.getQuestions();

        for(Question question:questions){
            totalMarks=totalMarks+question.getMarks();
        }
        int unansweredCount=quiz.getQuestions().size()-answeredCount;

            for(SelectedAnswers selectedAnswer:selectedAnswers){
                Question question =questionRepo.findById(selectedAnswer.getQuestionId()).get();
                Question_Option option=questionOptionsRepository.findById(selectedAnswer.getOptionId()).get();
                if(option.isCorrect()){
                    obtainedMarks=obtainedMarks+question.getMarks();
                    correctAnwers++;
                }
                else{
                    wrongAnswers++;
                }
            }
            quizResult.setQuizId(quizId);
            quizResult.setWrongAnswers(wrongAnswers);
            quizResult.setCorrectAnswers(correctAnwers);
            quizResult.setUnanswered(unansweredCount);

            int percentage=obtainedMarks*100/totalMarks;

            System.out.println(percentage);
            quizResult.setPercentage(percentage);
            if(percentage>=quiz.getPassingScore()){
                quizResult.setResult("Passes");
            }
            else{
                quizResult.setResult("Fail");
            }
        quizResultRepository.save(quizResult);
            return quizResult;
    }

    public List<QuizResult> quizzesByUserId(String userEmail){
        User user=userRepo.findByEmail(userEmail).get();
        return quizResultRepository.findAllByUserId(user.getUser_id());
    }

}
