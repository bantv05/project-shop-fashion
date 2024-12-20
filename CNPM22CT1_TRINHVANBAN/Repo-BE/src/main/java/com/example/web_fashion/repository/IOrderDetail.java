package com.example.web_fashion.repository;

import com.example.web_fashion.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrderDetail extends JpaRepository<OrderDetail, Long> {
}
