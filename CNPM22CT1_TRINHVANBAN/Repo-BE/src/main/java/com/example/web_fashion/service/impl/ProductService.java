package com.example.web_fashion.service.impl;

import com.example.web_fashion.builder.ProductSearchBuilder;
import com.example.web_fashion.converter.ProductSearchBuilderConverter;
import com.example.web_fashion.dto.CategoryDTO;
import com.example.web_fashion.dto.ProductDTO;
import com.example.web_fashion.dto.StyleDTO;
import com.example.web_fashion.model.Product;
import com.example.web_fashion.repository.IProductRepository;
import com.example.web_fashion.service.IProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ProductService implements IProductService {
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private IProductRepository productRepository;
    @Autowired
    private ProductSearchBuilderConverter productSearchBuilderConverter;
    @Override
    public List<ProductDTO> findAll() {
        List<Product> products = productRepository.findAll();
        List<ProductDTO> productDTOS = new ArrayList<>();
        for (Product product : products) {
            ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
            productDTOS.add(productDTO);
        }
        return productDTOS;
    }

    @Override
    public List<ProductDTO> getProductsSearch(Map<String, Object> params, List<String> categories, List<String> styles) {
        ProductSearchBuilder productSearchBuilder = productSearchBuilderConverter.toProductSearchBuilder(params, categories, styles);
//        List<Product> products = productRepository.findAll(productSearchBuilder);
        return List.of();
    }


}
