package com.prakashamaana.onlineQuizPlatform.repo;

import com.prakashamaana.onlineQuizPlatform.model.Question_Option;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionOptionsRepository extends JpaRepository<Question_Option,Integer> {


    List<Question_Option> findAllByQuestionId(Integer questionId);


}
