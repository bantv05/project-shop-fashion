package com.example.web_fashion.repository;

import com.example.web_fashion.entity.DetailSizeProduct;

import com.example.web_fashion.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.repository.query.Param;

public interface IDetailSizeProductRepository extends JpaRepository<DetailSizeProduct, Long> {
    void deleteByProduct(Product product);

}
