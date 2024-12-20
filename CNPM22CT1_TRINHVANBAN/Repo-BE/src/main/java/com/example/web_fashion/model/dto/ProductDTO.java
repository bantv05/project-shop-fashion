package com.example.web_fashion.model.dto;

import com.example.web_fashion.entity.Category;
import com.example.web_fashion.entity.StatusProduct;
import com.example.web_fashion.entity.Style;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private Long id;
    private String nameProduct;
    private Double price;
    private Double priceDiscount;
    private String description;
    private String image;
    private String tradeMake;
    private Integer quantity;
    private String color;
    private Long sold;
    private Boolean saleProduct = false;
    private Boolean newProduct = false;
    private StatusProduct statusProduct;
    private Style style;
    private Category category;
    @JsonProperty("created_at")
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime dayCreateProduct;
    @JsonProperty("update_at")
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime dayUpdateProduct;
    private String detailSizeProducts;


}
