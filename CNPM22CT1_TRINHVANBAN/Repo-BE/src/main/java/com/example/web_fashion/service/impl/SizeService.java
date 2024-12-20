package com.example.web_fashion.service.impl;

import com.example.web_fashion.entity.Size;
import com.example.web_fashion.repository.ISizeRepository;
import com.example.web_fashion.service.ISizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class SizeService implements ISizeService {
    @Autowired
    private ISizeRepository repository;
    @Override
    public List<Size> getSizeList() {
        return repository.findAll();
    }
}
