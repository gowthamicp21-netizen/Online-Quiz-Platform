package com.prakashamaana.onlineQuizPlatform.repo;

import com.prakashamaana.onlineQuizPlatform.model.Category;
import com.prakashamaana.onlineQuizPlatform.model.Difficulty;
import com.prakashamaana.onlineQuizPlatform.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz,Integer> {

    List<Quiz> findByTitle(String quizTitle);

    List<Quiz> findByCategory(Category category);

    List<Quiz> findByDifficulty(Difficulty difficulty);

    List<Quiz> findByDuration(Integer duration);

    @Query("select q from Quiz q order by createdAt desc limit 5")
    List<Quiz> findAllByOrderByCreatedAtDesc();


}
