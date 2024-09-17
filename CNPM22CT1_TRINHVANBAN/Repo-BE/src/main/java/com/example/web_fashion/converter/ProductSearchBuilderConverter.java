package com.example.web_fashion.converter;

import com.example.web_fashion.builder.ProductSearchBuilder;
import com.example.web_fashion.dto.StyleDTO;
import com.example.web_fashion.model.Category;
import com.example.web_fashion.util.MapUtil;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
//Map<String, Object> params,String key, Class<T> tClass
//@Component sử dụng để đánh dấu cho các class: khi không có hàm tạo (contructor) bên trong
@Component
public class ProductSearchBuilderConverter {
    public ProductSearchBuilder toProductSearchBuilder(Map<String, Object> params, List<String> categories, List<String> styles) {
        ProductSearchBuilder productSearchBuilder = new ProductSearchBuilder.Builder()
                                                    .setNameProduct(MapUtil.getObject(params, "name", String.class))
                                                    .setPriceDiscount(MapUtil.getObject(params, "priceDiscount", Double.class))
                                                    .setColor(MapUtil.getObject(params, "color", String.class))
                                                    .setSaleProduct(MapUtil.getObject(params, "saleProduct", Boolean.class) != null
                                                            ? MapUtil.getObject(params, "saleProduct", Boolean.class)
                                                            : false)
                                                    .setIdStatus(MapUtil.getObject(params, "idStatus", Long.class))
                                                    .setNewProduct(MapUtil.getObject(params, "newProduct", Boolean.class))
                                                    .setCategories(categories)
                                                    .setStyle(styles)
                                                    .build();
        return productSearchBuilder;
    }
}
