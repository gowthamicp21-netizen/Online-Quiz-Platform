package com.prakashamaana.onlineQuizPlatform.service;

import com.prakashamaana.onlineQuizPlatform.model.Category;
import com.prakashamaana.onlineQuizPlatform.model.Question;
import com.prakashamaana.onlineQuizPlatform.model.Question_Option;
import com.prakashamaana.onlineQuizPlatform.repo.CategoryRepository;
import com.prakashamaana.onlineQuizPlatform.repo.QuestionOptionsRepository;
import com.prakashamaana.onlineQuizPlatform.repo.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepo;

    @Autowired
    private QuestionOptionsRepository questionOptionRepo;

    @Autowired
    private CategoryRepository categoryRepo;

    public void updateQuestion(Question question,List<Question_Option> options ,Integer id) {
        Optional<Question> questionByDB=questionRepo.findById(id);
        List<Question_Option> optionsByDb=questionOptionRepo.findAllByQuestionId(id);
        if(questionByDB.isPresent()){
            if(question.getQuestionText()!=null){
                questionByDB.get().setQuestionText(question.getQuestionText());
            }
            if(question.getDifficulty()!=null){
                questionByDB.get().setDifficulty((question.getDifficulty()));
            }
            if(question.getMarks()!=null){
                questionByDB.get().setMarks(question.getMarks());
            }
        }
        for(Question_Option optionByDB:optionsByDb){
            for(Question_Option updatedoption:options){
                if(updatedoption.getId().equals(optionByDB.getId())){
                    optionByDB.setOption(updatedoption.getOption());
                    optionByDB.setCorrect(updatedoption.isCorrect());
                    questionOptionRepo.save(optionByDB);
                }
            }
        }
        questionRepo.save(questionByDB.get());
    }
    public void deleteQuestion(Integer id) {
        questionRepo.deleteById(id);
    }


    public Question addQuestion( Question question) {
       Question response= questionRepo.save(question);
       return response;
    }

    public List<Question> getQuestionByCategory(int categoryId) {

        return questionRepo.findByCategoryId(categoryId);

    }

    public Question getQuestionById(int questionId) {
        return  questionRepo.findById(questionId).get();
    }

    public void addOptions( List<Question_Option> questionOptions) {


        for (Question_Option option : questionOptions) {

            questionOptionRepo.save(option);
        }
    }
}
