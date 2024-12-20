package com.example.web_fashion.repository;

import com.example.web_fashion.entity.StatusProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IProductStatusRepository extends JpaRepository<StatusProduct, Integer> {
    StatusProduct findById(Long id);
}
