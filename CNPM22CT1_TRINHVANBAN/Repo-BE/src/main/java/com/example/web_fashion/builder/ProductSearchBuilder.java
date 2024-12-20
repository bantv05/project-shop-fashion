package com.example.web_fashion.builder;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

public class ProductSearchBuilder {
    private String nameProduct;
    private Double priceDiscountFrom;
    private Double priceDiscountTo;
    private String color;
    private Boolean saleProduct = false;
    private Boolean newProduct = false;
    private Long idStatus;
    private Long idProductOrder;
    private List<String> sizes = new ArrayList<>();
    private List<String> style = new ArrayList<>();
    private List<String> categories = new ArrayList<>();

    public ProductSearchBuilder(Builder builder) {
        nameProduct = builder.nameProduct;
        priceDiscountFrom = builder.priceDiscountFrom;
        priceDiscountTo = builder.priceDiscountTo;
        color = builder.color;
        saleProduct = builder.saleProduct;
        newProduct = builder.newProduct;
        idStatus = builder.idStatus;
        sizes = builder.sizes;
        style = builder.style;
        idProductOrder = builder.idProductOrder;
        categories = builder.categories;
    }

    public List<String> getCategories() {
        return categories;
    }

    public List<String> getStyle() {
        return style;
    }

    public Long getIdStatus() {
        return idStatus;
    }

    public Boolean getNewProduct() {
        return newProduct;
    }

    public Boolean getSaleProduct() {
        return saleProduct;
    }

    public String getColor() {
        return color;
    }

    public Double getPriceDiscountTo() {
        return priceDiscountTo;
    }

    public Double getPriceDiscountFrom() {
        return priceDiscountFrom;
    }

    public List<String> getSizes() {
        return sizes;
    }

    public String getNameProduct() {
        return nameProduct;
    }

    public Long getIdProductOrder() {
        return idProductOrder;
    }

    //đối tượng này sử dụng để set dữ liệu
    public static class Builder {
        private String nameProduct;
        private Double priceDiscountFrom;
        private Double priceDiscountTo;
        private String color;
        private Boolean saleProduct = false;
        private Boolean newProduct = false;
        private Long idStatus;
        private Long idProductOrder;
        private List<String> sizes = new ArrayList<>();
        private List<String> style = new ArrayList<>();
        private List<String> categories = new ArrayList<>();

        public Builder setNameProduct(String nameProduct) {
            this.nameProduct = nameProduct;
            return this;
        }
        public Builder setPriceDiscount(Double priceDiscountFrom) {
            this.priceDiscountFrom = priceDiscountFrom;
            return this;
        }
        public Builder setPriceDiscountTo(Double priceDiscountTo) {
            this.priceDiscountTo = priceDiscountTo;
            return this;
        }

        public Builder setColor(String color) {
            this.color = color;
            return this;
        }

        public Builder setSaleProduct(Boolean saleProduct) {
            this.saleProduct = saleProduct;
            return this;
        }

        public Builder setNewProduct(Boolean newProduct) {
            this.newProduct = newProduct;
            return this;
        }

        public Builder setIdStatus(Long status) {
            this.idStatus = status;
            return this;
        }

        public Builder setStyle(List<String> style) {
            this.style = style;
            return this;
        }

        public Builder setPriceDiscountFrom(Double priceDiscountFrom) {
            this.priceDiscountFrom = priceDiscountFrom;
            return this;
        }

        public Builder setSizes(List<String> sizes) {
            this.sizes = sizes;
            return this;
        }

        public Builder setCategories(List<String> categories) {
            this.categories = categories;
            return this;
        }

        public Builder setIdProductOrder(Long idProductOrder) {
            this.idProductOrder = idProductOrder;
            return this;
        }

    public ProductSearchBuilder build() {
            return new ProductSearchBuilder(this);
        }
    }
}
