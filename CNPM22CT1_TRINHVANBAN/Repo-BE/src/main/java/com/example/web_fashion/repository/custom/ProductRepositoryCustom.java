package com.example.web_fashion.repository.custom;

import com.example.web_fashion.builder.ProductSearchBuilder;
import com.example.web_fashion.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
public interface ProductRepositoryCustom {
    Page<Product> getSearchProducts(ProductSearchBuilder searchBuilder, Pageable pageable);
}

