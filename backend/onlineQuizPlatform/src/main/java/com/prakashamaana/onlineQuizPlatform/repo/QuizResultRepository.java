package com.prakashamaana.onlineQuizPlatform.repo;

import com.prakashamaana.onlineQuizPlatform.model.dto.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizResultRepository extends JpaRepository<QuizResult,Integer> {

    List<QuizResult> findAllByUserId(Long userId);
}

