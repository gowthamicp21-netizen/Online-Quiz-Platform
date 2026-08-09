package com.prakashamaana.onlineQuizPlatform.service;

import com.prakashamaana.onlineQuizPlatform.model.Category;
import com.prakashamaana.onlineQuizPlatform.repo.CategoryRepository;
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

    public void updateCategory(Category category) {

        categoryRepo.save(category);
    }

    public void deleteCategory(String name) {
        Category category=categoryRepo.findByName(name);
        categoryRepo.delete(category);
    }
}
