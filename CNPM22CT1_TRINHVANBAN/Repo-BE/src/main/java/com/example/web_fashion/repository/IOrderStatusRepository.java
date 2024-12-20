package com.example.web_fashion.repository;

import com.example.web_fashion.entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IOrderStatusRepository extends JpaRepository<OrderStatus, Long> {
    Optional<OrderStatus> getOrderStatusById(Long idStatusOrder);
}
