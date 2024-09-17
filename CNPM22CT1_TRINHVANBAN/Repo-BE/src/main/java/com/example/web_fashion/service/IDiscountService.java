package com.example.web_fashion.service;

import com.example.web_fashion.model.Category;
import com.example.web_fashion.model.Discount;

import java.util.List;

public interface IDiscountService {
    List<Discount> findAllDiscount();
}
