package com.example.web_fashion.service.impl;

import com.example.web_fashion.model.Order;
import com.example.web_fashion.repository.IOrderRepository;
import com.example.web_fashion.service.IOrderService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class OrderService implements IOrderService {
    private IOrderRepository orderRepository;
    @Override
    public List<Order> findAllOrders() {
        return orderRepository.findAll();
    }
}
