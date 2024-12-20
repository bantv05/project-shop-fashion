package com.example.web_fashion.service.impl;

import com.example.web_fashion.builder.ProductSearchBuilder;
import com.example.web_fashion.converter.ProductDTOConverter;
import com.example.web_fashion.converter.ProductSearchBuilderConverter;
import com.example.web_fashion.model.dto.ProductDTO;
import com.example.web_fashion.entity.Product;
import com.example.web_fashion.repository.IProductRepository;
import com.example.web_fashion.service.IProductService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    @Autowired
    private ProductDTOConverter productDTOConverter;

    @Override
    public Page<ProductDTO> getProductsSearch(Map<String, Object> params,
                                              List<String> categories,
                                              List<String> styles,
                                              List<String> sizes,
                                              Integer pageNumber, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        ProductSearchBuilder productSearchBuilder = productSearchBuilderConverter.toProductSearchBuilder(params, categories, styles, sizes);
        Page<Product> products = productRepository.getSearchProducts(productSearchBuilder, pageable);
        List<ProductDTO> productSearch = new ArrayList<>();
        for (Product item : products) {
            productSearch.add(productDTOConverter.convertProductToProductDTO(item));
        }
        return new PageImpl<>(productSearch, pageable, products.getTotalElements());
    }

    @Override
    public Product saveProduct(ProductDTO productDTO) {
        Product product = productDTOConverter.convertProductDTOToProduct(productDTO);
        return product;
    }

    @Override
    @Transactional
    public Product updateProduct(ProductDTO productDTO) {
        Product product = productDTOConverter.convertProductDTOToProductUpdate(productDTO);
        return product;
    }

    @Override
    public void deleteByIdIns(List<Long> productIds) {
        for (Long it: productIds){
            productRepository.queryDeleteById(it);
        }
    }

    @Override
    public ProductDTO getProduct(Long productId) {
        Product product = productRepository.findById(productId).get();
        ProductDTO productSearch;
        productSearch = productDTOConverter.convertProductToProductDTO(product);
        return productSearch;
    }
}
