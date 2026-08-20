package com.prakashamaana.onlineQuizPlatform.repo;

import com.prakashamaana.onlineQuizPlatform.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Integer> {

    public Category findByName(String name);

    Category findById(Long categoryId);

    void deleteById(Long id);

    boolean existsById(Long id);
}
