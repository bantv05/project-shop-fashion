package com.example.web_fashion.service;

import com.example.web_fashion.entity.StatusProduct;

import java.util.List;

public interface IProductStatusService {
    List<StatusProduct> getFindAllStatus();
    StatusProduct findByIdStatus(Long id);
}
