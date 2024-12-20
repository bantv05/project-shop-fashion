package com.example.web_fashion.service;

import com.example.web_fashion.entity.Order;
import com.example.web_fashion.entity.OrderDetail;
import com.example.web_fashion.exception.DataNotFoundException;
import com.example.web_fashion.model.dto.OrderDetailDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IOrderDetailService {
    OrderDetail createOrderDetail(OrderDetailDTO orderDetailDTO);
    OrderDetail updateOrderDetail(Long id, OrderDetailDTO orderDetailDTO) throws DataNotFoundException;;
    OrderDetail getOrderDetailById(Long id);
    void deleteOrderDetail(Long id);
    Page<OrderDetailDTO> getFindAllOrderDetail(Integer pageNumber, Integer pageSize);

}
