package com.prakashamaana.onlineQuizPlatform.controller;

import com.prakashamaana.onlineQuizPlatform.model.Category;
import com.prakashamaana.onlineQuizPlatform.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/categories")
    public ResponseEntity<?> addCategory(@RequestBody Category category){
        categoryService.addCategory(category);
        return new ResponseEntity<>("Category added successfully", HttpStatus.OK);
    }

    @GetMapping("/categories/{categoryId}")
    public Category getCategory(@PathVariable Long categoryId){
        return categoryService.getCategory(categoryId);
    }

    @GetMapping("/categories")
    public List<Category> getCategories(){
        List<Category> categories= categoryService.getCategories();
        return categories;
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<?> updateCategory(@RequestBody Category category, @PathVariable Integer id)
    {
        categoryService.updateCategory(category,id);
        return new ResponseEntity<>("Category Updated successfully", HttpStatus.OK);
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id){
        categoryService.deleteCategory(id);
        return new ResponseEntity<>("Category Deleted successfully", HttpStatus.OK);
    }

}
