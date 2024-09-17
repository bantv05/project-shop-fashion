package com.example.web_fashion.controller;

import com.example.web_fashion.dto.CategoryDTO;
import com.example.web_fashion.dto.ProductDTO;
import com.example.web_fashion.dto.StyleDTO;
import com.example.web_fashion.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("public/")
public class ProductController {
    @Autowired
    private IProductService iProductService;
    @GetMapping("list-product")
    public List<ProductDTO> getProducts() {
        return iProductService.findAll();
    }

    @GetMapping("api/product")
    public List<ProductDTO> getProductsSearch(@RequestParam Map<String, Object> params,
                                              @RequestParam(required = false) List<String> categories,
                                              @RequestParam(required = false) List<String> styles) {
        return iProductService.getProductsSearch(params, categories, styles);
    }

}
