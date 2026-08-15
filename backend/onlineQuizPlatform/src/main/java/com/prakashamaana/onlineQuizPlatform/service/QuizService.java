package com.prakashamaana.onlineQuizPlatform.service;

import com.prakashamaana.onlineQuizPlatform.model.Question;
import com.prakashamaana.onlineQuizPlatform.model.Quiz;
import com.prakashamaana.onlineQuizPlatform.repo.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

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

    public void createQuiz(Quiz quiz) {
        quizRepository.save(quiz);

    }
}
