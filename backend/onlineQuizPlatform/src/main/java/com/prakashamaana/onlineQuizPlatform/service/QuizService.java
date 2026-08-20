package com.prakashamaana.onlineQuizPlatform.service;

import com.prakashamaana.onlineQuizPlatform.model.*;
import com.prakashamaana.onlineQuizPlatform.model.dto.QuizResult;
import com.prakashamaana.onlineQuizPlatform.repo.CategoryRepository;
import com.prakashamaana.onlineQuizPlatform.repo.QuizRepository;
import com.prakashamaana.onlineQuizPlatform.repo.QuizResultRepository;
import com.prakashamaana.onlineQuizPlatform.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuizService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private QuizResultRepository quizResultRepository;



    public List<Question> getQuestions(int id) {
        Optional<Quiz> quiz=quizRepository.findById(id);
        return quiz.get().getQuestions();
    }

    public void addQuestion(int id, Question question) {
        Optional<Quiz> quiz=quizRepository.findById(id);
        List<Question> questions=quiz.get().getQuestions();
        questions.add(question);
        quiz.get().setQuestions(questions);
        quizRepository.save(quiz.get());

    }

    public void createQuiz(Quiz quiz, String username) {
        quiz.setCreatedBy(userRepo.findByEmail((username)).get());
        quizRepository.save(quiz);

    }

    public List<Quiz> getQuizByCategory(Integer categoryId) {
        Category category=categoryRepository.findById(categoryId).get();
       return quizRepository.findByCategory(category);
    }

    public void deleteQuiz(int quizId) {
        quizRepository.deleteById(quizId);
    }

    public Quiz getQuizById(Integer quizId) {
        return quizRepository.findById(quizId).get();
    }

    public void updateQuiz(int quizId, Quiz updatedQuiz) {

        Quiz existingQuiz = quizRepository.findById(quizId)
                .orElseThrow(() ->
                        new RuntimeException("Quiz not found with id: " + quizId)
                );

        existingQuiz.setTitle(updatedQuiz.getTitle());
        existingQuiz.setDescription(updatedQuiz.getDescription());
        existingQuiz.setCategory(updatedQuiz.getCategory());

        quizRepository.save(existingQuiz);
    }

    public List<QuizResult> getQuizResultByUserId(Long userId) {
        return quizResultRepository.findAllByUserId(userId);
    }

    public List<User> getAllUsers() {
        return userRepo.findAllByUser_role(Role.STUDENT);
    }
}
