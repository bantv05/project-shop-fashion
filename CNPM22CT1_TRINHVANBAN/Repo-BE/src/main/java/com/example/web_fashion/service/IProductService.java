package com.example.web_fashion.service;

import com.example.web_fashion.entity.Product;
import com.example.web_fashion.model.dto.ProductDTO;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;

public interface IProductService {
//    List<ProductDTO> findAll();
    Page<ProductDTO> getProductsSearch(Map<String, Object> params, List<String> categoryDTOS, List<String> styles, List<String> sizes, Integer pageNumber, Integer pageSize);
    Product saveProduct(ProductDTO productDTO);
    Product updateProduct(ProductDTO productDTO);
    void deleteByIdIns(List<Long> productIds);
    ProductDTO getProduct(Long productId);
}

