package com.example.web_fashion.service;

import com.example.web_fashion.model.Order;

import java.util.List;

public interface IOrderService {
    List<Order> findAllOrders();
}
