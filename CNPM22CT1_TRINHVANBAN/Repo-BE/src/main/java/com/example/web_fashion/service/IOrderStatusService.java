package com.example.web_fashion.service;

import com.example.web_fashion.entity.OrderStatus;

import java.util.List;
import java.util.Optional;

public interface IOrderStatusService {
    List<OrderStatus> findAllStatusOrder();
    Optional<OrderStatus> findByIdStatusOrder(Long id);
}
