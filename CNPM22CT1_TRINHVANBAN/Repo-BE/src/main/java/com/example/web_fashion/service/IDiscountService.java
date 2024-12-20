package com.example.web_fashion.service;

import com.example.web_fashion.entity.Discount;
import com.example.web_fashion.exception.DataNotFoundException;

import java.util.List;
import java.util.Optional;

public interface IDiscountService {
    List<Discount> findAllDiscount();
    Discount getByIdDiscount(Long id) throws DataNotFoundException;
}
