package com.example.web_fashion.service.impl;

import com.example.web_fashion.model.Size;
import com.example.web_fashion.repository.ISizeRepository;
import com.example.web_fashion.service.ISizeService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class SizeService implements ISizeService {
    private ISizeRepository repository;
    @Override
    public List<Size> getSizeList() {
        return repository.findAll();
    }
}
