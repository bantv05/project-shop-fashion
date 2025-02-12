package com.example.web_fashion.service.impl;

import com.example.web_fashion.model.Category;
import com.example.web_fashion.repository.ICategoryRepository;
import com.example.web_fashion.service.ICategoryService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CategoryService implements ICategoryService {
    private ICategoryRepository categoryRepository;

    @Override
    public List<Category> findAllCate() {
        return categoryRepository.findAll();
    }
}
