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
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/categories")
    public ResponseEntity<?> addCategory(@RequestBody Category category){
        categoryService.addCategory(category);
        return new ResponseEntity<>("Category added successfully", HttpStatus.OK);
    }

    @GetMapping("/categories")
    public List<Category> getCategories(){
        List<Category> categories= categoryService.getCategories();
        return categories;
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<?> updateCategory(@RequestBody Category category, @PathVariable int id)
    {
        categoryService.updateCategory(category);
        return new ResponseEntity<>("Category Updated successfully", HttpStatus.OK);
    }

    @DeleteMapping("/categories")
    public ResponseEntity<?> deleteCategory(@RequestParam String name){
        categoryService.deleteCategory(name);
        return new ResponseEntity<>("Category Deleted successfully", HttpStatus.OK);
    }
}
