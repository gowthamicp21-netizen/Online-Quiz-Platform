package com.prakashamaana.onlineQuizPlatform.service;

import com.prakashamaana.onlineQuizPlatform.model.Category;
import com.prakashamaana.onlineQuizPlatform.repo.CategoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepo;


    public void addCategory(Category category) {
        categoryRepo.save(category);
    }

    public List<Category> getCategories() {
        return categoryRepo.findAll();
    }

    public void updateCategory(Category category, Integer id) {

        Category existingCategory =
                categoryRepo.findById(id)
                        .orElseThrow(
                                () -> new RuntimeException("Category not found")
                        );

        existingCategory.setName(category.getName());
        existingCategory.setDescription(category.getDescription());

        categoryRepo.save(existingCategory);
    }

    @Transactional
    public void deleteCategory(Long id) {

        if (!categoryRepo.existsById(id)) {
            throw new RuntimeException("Category not found");
        }

        categoryRepo.deleteById(id);
    }

    public Category getCategory(Long categoryId) {
        return categoryRepo.findById(categoryId);
    }
}
