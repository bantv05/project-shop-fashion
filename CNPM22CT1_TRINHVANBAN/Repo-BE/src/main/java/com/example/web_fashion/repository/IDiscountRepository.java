package com.example.web_fashion.repository;

import com.example.web_fashion.model.Discount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IDiscountRepository extends JpaRepository<Discount, Integer> {
}
