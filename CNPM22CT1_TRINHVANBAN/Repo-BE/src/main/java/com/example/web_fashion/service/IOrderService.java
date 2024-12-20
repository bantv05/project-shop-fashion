package com.example.web_fashion.service;

import com.example.web_fashion.entity.Order;
import com.example.web_fashion.exception.DataNotFoundException;
import com.example.web_fashion.model.dto.OrderDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IOrderService {
    Order createOrder(OrderDTO orderDTO) throws DataNotFoundException;
    Order updateOrder(Long id, OrderDTO orderDTO) throws DataNotFoundException;
    Order getOrderById(Long id) throws DataNotFoundException;
    void deleteOrder(Long id) throws DataNotFoundException;
    List<Order> findByUserId(Long userId);
    Page<OrderDTO> getFindAllOrder(Integer pageNumber, Integer pageSize);
}
