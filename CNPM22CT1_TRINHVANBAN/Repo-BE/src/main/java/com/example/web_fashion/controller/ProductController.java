package com.example.web_fashion.controller;

import com.example.web_fashion.entity.Product;
import com.example.web_fashion.model.dto.ProductDTO;
import com.example.web_fashion.service.IProductService;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@Transactional
@RestController
@RequestMapping("${api.prefix}")
public class ProductController {
    @Autowired
    private IProductService iProductService;
//    @GetMapping("list-product")
//    public List<ProductDTO> getProducts() {
//        return iProductService.findAll();
//    }

    @GetMapping("public/search-product")//ok
    public ResponseEntity<Page<ProductDTO>> getProductsSearch(@RequestParam Map<String, Object> params,
                                                              @RequestParam(name = "category", required = false) List<String> categories,
                                                              @RequestParam(name = "style", required = false) List<String> styles,
                                                              @RequestParam(name = "size", required = false) List<String> sizes,
                                                              @RequestParam(name = "pageNumber", defaultValue = "0") Integer pageNumber,
                                                              @RequestParam(name = "pageSize", defaultValue = "10") Integer pageSize
                                                              ) {

        Page<ProductDTO> productDTOPage = iProductService.getProductsSearch(params, categories, styles, sizes, pageNumber, pageSize);
        return ResponseEntity.ok(productDTOPage);
    }

    @PostMapping("private/create-product")//ok
    public ResponseEntity<?> createProduct(@Valid @RequestBody ProductDTO productDTO,
                                           BindingResult result) {
        try {
            if (result.hasErrors()){
                List<String> errorMessages = result.getFieldErrors().stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(errorMessages);
            }
            Product newProduct = iProductService.saveProduct(productDTO);
            return ResponseEntity.ok(newProduct);
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex);
        }

    }

    @PutMapping("private/update-product")//ok
    public ResponseEntity<?> updateProduct(
                                           @RequestBody ProductDTO productDTO) {
        try {
            Product updateProduct = iProductService.updateProduct(productDTO);
            return ResponseEntity.ok(updateProduct);
        }catch (Exception ex){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex);
        }
    }
    @GetMapping("public/get-detail-product/{id}")//ok
    public ResponseEntity<?> detailProduct(@PathVariable Long id) {
        try {
            ProductDTO detailProduct = iProductService.getProduct(id);
            return ResponseEntity.ok(detailProduct);
        }catch (Exception ex){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex);
        }
    }
    @DeleteMapping("private/delete-product/{ids}")//ok http://localhost:8080/api/v1/private/delete-product/34x
    public void detailProduct(@PathVariable List<Long> ids) {
        iProductService.deleteByIdIns(ids);
    }
}
