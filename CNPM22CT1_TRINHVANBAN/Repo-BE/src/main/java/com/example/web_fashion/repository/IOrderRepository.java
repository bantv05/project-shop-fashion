package com.example.web_fashion.repository;

import com.example.web_fashion.entity.Order;
import com.example.web_fashion.exception.DataNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IOrderRepository extends JpaRepository<Order, Integer> {
    Optional<Order> getOrderById(Long id);
    //Tìm các đơn hàng của 1 user nào đó
    List<Order> findByUserId(Long userId);

    @Query(value = "select o from Order o " +
            "where o.active = true ")
    Page<Order> queryFindAll(Pageable pageable);
}
