package com.example.web_fashion.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Product extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name_product")
    private String nameProduct;
    @Column(name = "price")
    private Double price;
    @Column(name = "price_discount")
    private Double priceDiscount;
    @Column(name = "description")
    private String description;
    @Column(name = "image")
    private String image;
    @Column(name = "trade_make")
    private String tradeMake;
    @Column(name = "sold")
    private Long sold;
    @Column(name = "quantity")
    private Integer quantity;
    @Column(name = "is_delete")
    private boolean isDelete = false;
    @Column(name = "color")
    private String color;
    @Column(name = "sale_product")
    private Boolean saleProduct = false;
    @Column(name = "new_product")
    private Boolean newProduct = false;
    @ManyToOne
    @JoinColumn(name = "id_status_product")
    private StatusProduct statusProduct;

    @ManyToOne
    @JoinColumn(name = "id_style")
    private Style style;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<DetailSizeProduct> detailSizeProducts = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "id_category")
    private Category category;
}
