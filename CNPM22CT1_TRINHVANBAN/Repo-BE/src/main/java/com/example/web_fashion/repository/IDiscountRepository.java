package com.example.web_fashion.repository;

import com.example.web_fashion.entity.Discount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IDiscountRepository extends JpaRepository<Discount, Integer> {
    Optional<Discount> getDiscountById(Long idDiscount);
}
