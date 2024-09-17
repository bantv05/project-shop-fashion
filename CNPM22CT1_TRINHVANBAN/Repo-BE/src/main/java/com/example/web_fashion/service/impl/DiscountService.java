package com.example.web_fashion.service.impl;

import com.example.web_fashion.model.Discount;
import com.example.web_fashion.service.IDiscountService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class DiscountService implements IDiscountService {
    @Override
    public List<Discount> findAllDiscount() {
        return List.of();
    }
}
