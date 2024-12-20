package com.example.web_fashion.service.impl;

import com.example.web_fashion.entity.StatusProduct;
import com.example.web_fashion.repository.IProductStatusRepository;
import com.example.web_fashion.service.IProductStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ProductStatusService implements IProductStatusService {
    @Autowired
    private IProductStatusRepository statusRepository;
    @Override
    public List<StatusProduct> getFindAllStatus() {
        return statusRepository.findAll();
    }

    @Override
    public StatusProduct findByIdStatus(Long id) {
        return statusRepository.findById(id);
    }
}
