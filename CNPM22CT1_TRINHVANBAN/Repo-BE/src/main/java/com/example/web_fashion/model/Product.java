package com.example.web_fashion.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    @ManyToOne
    @JoinColumn(name = "id_status")
    private Status status;

    @ManyToOne
    @JoinColumn(name = "id_style")
    private Style style;

    @ManyToOne
    @JoinColumn(name = "id_category")
    private Category category;
}
