package com.example.web_fashion.dto;

import com.example.web_fashion.model.Category;
import com.example.web_fashion.model.Size;
import com.example.web_fashion.model.Status;
import com.example.web_fashion.model.Style;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private Boolean saleProduct = false;
    private Boolean newProduct = false;
    private Status status;
    private Style style;
    private Category category;

}
