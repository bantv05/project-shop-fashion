package com.example.web_fashion.service.impl;

import com.example.web_fashion.entity.Discount;
import com.example.web_fashion.exception.DataNotFoundException;
import com.example.web_fashion.repository.IDiscountRepository;
import com.example.web_fashion.service.IDiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiscountService implements IDiscountService {
    @Autowired
    private IDiscountRepository iDiscountRepository;
    @Override
    public List<Discount> findAllDiscount() {
        return iDiscountRepository.findAll();
    }

    @Override
    public Discount getByIdDiscount(Long id) throws DataNotFoundException {
        return iDiscountRepository.getDiscountById(id)
                .orElseThrow(() -> new DataNotFoundException("Discount not found with ID " + id));
    }
}
