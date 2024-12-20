package com.example.web_fashion.converter;

import com.example.web_fashion.builder.ProductSearchBuilder;
import com.example.web_fashion.utils.MapUtil;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
//Map<String, Object> params,String key, Class<T> tClass
//@Component sử dụng để đánh dấu cho các class: khi không có hàm tạo (contructor) bên trong
@Component
public class ProductSearchBuilderConverter {
    public ProductSearchBuilder toProductSearchBuilder(Map<String, Object> params, List<String> categories, List<String> styles, List<String> sizes) {
        ProductSearchBuilder productSearchBuilder = new ProductSearchBuilder.Builder()
                .setNameProduct(MapUtil.getObject(params, "name", String.class))
                .setPriceDiscountFrom(MapUtil.getObject(params, "priceDiscountFrom", Double.class))
                .setPriceDiscountTo(MapUtil.getObject(params, "priceDiscountTo", Double.class))
                .setColor(MapUtil.getObject(params, "color", String.class))
                .setSaleProduct(MapUtil.getObject(params, "saleProduct", Boolean.class) != null
                        ? MapUtil.getObject(params, "saleProduct", Boolean.class)
                        : false)
                .setNewProduct(MapUtil.getObject(params, "newProduct", Boolean.class))
                .setIdStatus(MapUtil.getObject(params, "idStatus", Long.class))
                .setIdProductOrder(MapUtil.getObject(params, "idProductOrder", Long.class))
                .setSizes(sizes)
                .setStyle(styles)
                .setCategories(categories)
                .build();
        return productSearchBuilder;
    }
}
