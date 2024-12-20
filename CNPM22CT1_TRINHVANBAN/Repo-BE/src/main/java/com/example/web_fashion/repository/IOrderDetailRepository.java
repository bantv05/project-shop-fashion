package com.example.web_fashion.repository;

import com.example.web_fashion.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IOrderDetailRepository extends JpaRepository<OrderDetail, Long> {
    Optional<OrderDetail> getOrderDetailById(Long id);
}
