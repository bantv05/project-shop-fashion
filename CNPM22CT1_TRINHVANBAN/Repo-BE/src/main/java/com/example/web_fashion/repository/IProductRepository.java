package com.example.web_fashion.repository;

import com.example.web_fashion.entity.Product;
import com.example.web_fashion.repository.custom.ProductRepositoryCustom;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.Min;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface IProductRepository extends JpaRepository<Product, Long>, ProductRepositoryCustom {
    @Modifying
    @Transactional
    @Query(value = " UPDATE Product p SET p.isDelete = true WHERE p.id = ?1 ")
    void queryDeleteById(Long idProduct);

    Optional<Product> findProductById(Long id);

    Product getProductById(Long id);
}

