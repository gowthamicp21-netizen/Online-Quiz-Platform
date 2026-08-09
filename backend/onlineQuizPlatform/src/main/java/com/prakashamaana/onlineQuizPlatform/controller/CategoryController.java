package com.prakashamaana.onlineQuizPlatform.controller;

import com.prakashamaana.onlineQuizPlatform.model.Category;
import com.prakashamaana.onlineQuizPlatform.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public ResponseEntity<?> addCategory(@RequestBody Category category){
        categoryService.addCategory(category);
        return new ResponseEntity<>("Category added successfully", HttpStatus.OK);
    }

    @GetMapping
    public List<Category> getCategories(){
        List<Category> categories= categoryService.getCategories();
        return categories;
    }

    @PutMapping
    public ResponseEntity<?> updateCategory(@RequestBody Category category)
    {
        categoryService.updateCategory(category);
        return new ResponseEntity<>("Category Updated successfully", HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteCategory(String name){
        categoryService.deleteCategory(name);
        return new ResponseEntity<>("Category Deleted successfully", HttpStatus.OK);
    }
}
