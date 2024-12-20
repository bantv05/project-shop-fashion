package com.example.web_fashion.model.dto;

import com.example.web_fashion.entity.Order;
import com.example.web_fashion.entity.Product;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Min;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDetailDTO {
    private Long id;
    @Min(value=0, message = "Product's ID must be >= 0")
    private Float price;
    @JsonProperty("number_of_product")
    @Min(value = 1, message = "number of product must be > 0")
    private int numberOfProducts;
    @JsonProperty("totalMoney")
    private Float totalMoney;
    private String color;
    @Min(value=1, message = "Product's ID must be > 0")
    @JsonProperty("product_id")
    private Long productId;
    @JsonProperty("day_create_product")
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDateTime dayCreateProduct;
    @JsonProperty("order_id")
    @Min(value=1, message = "Order's ID must be > 0")
    private Long orderId;
}
