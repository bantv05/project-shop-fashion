package com.example.web_fashion.service.impl;

import com.example.web_fashion.entity.OrderStatus;
import com.example.web_fashion.repository.IOrderStatusRepository;
import com.example.web_fashion.service.IOrderStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderStatusService implements IOrderStatusService {
    @Autowired
    private IOrderStatusRepository iStatusOrderRepository;

    @Override
    public List<OrderStatus> findAllStatusOrder() {
        return iStatusOrderRepository.findAll();
    }

    @Override
    public Optional<OrderStatus> findByIdStatusOrder(Long id) {
        return iStatusOrderRepository.findById(id);
    }
}
