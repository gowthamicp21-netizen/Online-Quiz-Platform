package com.prakashamaana.onlineQuizPlatform.repo;

import com.prakashamaana.onlineQuizPlatform.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizRepository extends JpaRepository<Quiz,Integer> {
}
