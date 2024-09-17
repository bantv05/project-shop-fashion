package com.example.web_fashion.builder;

import com.example.web_fashion.model.Category;
import com.example.web_fashion.model.Status;
import com.example.web_fashion.model.Style;

import java.util.ArrayList;
import java.util.List;

public class ProductSearchBuilder {
    private String nameProduct;
    private Double priceDiscount;
    private String color;
    private Boolean saleProduct = false;
    private Boolean newProduct = false;
    private Long idStatus;
    private List<String> style = new ArrayList<>();
    private List<String> categories = new ArrayList<>();

    public ProductSearchBuilder(Builder builder) {
        nameProduct = builder.nameProduct;
        priceDiscount = builder.priceDiscount;
        color = builder.color;
        saleProduct = builder.saleProduct;
        newProduct = builder.newProduct;
        idStatus = builder.idStatus;
        style = builder.style;
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

    public Double getPriceDiscount() {
        return priceDiscount;
    }

    public String getNameProduct() {
        return nameProduct;
    }
//đối tượng này sử dụng để set dữ liệu
    public static class Builder {
        private String nameProduct;
        private Double priceDiscount;
        private String color;
        private Boolean saleProduct = false;
        private Boolean newProduct = false;
        private Long idStatus;
        private List<String> style = new ArrayList<>();
        private List<String> categories = new ArrayList<>();

        public Builder setNameProduct(String nameProduct) {
            this.nameProduct = nameProduct;
            return this;
        }
        public Builder setPriceDiscount(Double priceDiscount) {
            this.priceDiscount = priceDiscount;
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

        public Builder setCategories(List<String> categories) {
            this.categories = categories;
            return this;
        }
        public ProductSearchBuilder build() {
            return new ProductSearchBuilder(this);
        }
    }
}
