package com.example.web_fashion.repository.custom.impl;

import com.example.web_fashion.builder.ProductSearchBuilder;
import com.example.web_fashion.entity.Product;
import com.example.web_fashion.repository.custom.ProductRepositoryCustom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.lang.reflect.Field;
import java.util.List;
import java.util.stream.Collectors;

@Repository
@Primary
public class ProductRepositoryCustomImpl implements ProductRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;
    @Override
    public Page<Product> getSearchProducts(ProductSearchBuilder productSearchBuilder, Pageable pageable) {
        StringBuilder sql = new StringBuilder(" SELECT p.* FROM product p ");
        joinTable(productSearchBuilder, sql);
        sql.append(" WHERE 1=1 ");
        sql.append(" and is_delete=0 ");
        queryNomal(productSearchBuilder, sql);
        querySpesal(productSearchBuilder, sql);
        sql.append(" GROUP BY p.id ");

        // Tính tổng số bản ghi để hỗ trợ phân trang
        StringBuilder countSql = new StringBuilder(" SELECT COUNT(DISTINCT p.id) FROM product p ");
        joinTable(productSearchBuilder, countSql);
        countSql.append(" WHERE 1=1 ");
        countSql.append(" AND is_delete = 0 ");
        queryNomal(productSearchBuilder, countSql);
        querySpesal(productSearchBuilder, countSql);

        // Thực thi truy vấn đếm
        Query countQuery = entityManager.createNativeQuery(countSql.toString());
        Long totalElements = ((Number) countQuery.getSingleResult()).longValue();

        // Thêm phân trang vào truy vấn chính
        sql.append(" LIMIT ").append(pageable.getPageSize())
                .append(" OFFSET ").append(pageable.getOffset());

        // Thực thi truy vấn lấy dữ liệu
        Query query = entityManager.createNativeQuery(sql.toString(), Product.class);
        List<Product> products = query.getResultList();

        // Trả về Page<Product>
        return new PageImpl<>(products, pageable, totalElements);
    }

    // Thêm các bảng join nếu có
    private void joinTable(ProductSearchBuilder productSearchBuilder, StringBuilder sql) {
        Long idProductOrder = productSearchBuilder.getIdProductOrder();
        if (idProductOrder != null) {
            sql.append(" JOIN detail_order do ON p.id = do.id_product ");
            sql.append(" JOIN orders o ON do.id_order = o.id ");
        }

        if (productSearchBuilder.getSizes() != null && !productSearchBuilder.getSizes().isEmpty()) {
            sql.append(" JOIN detail_size_product s ON s.id_product = p.id ");
            sql.append(" JOIN size sz ON sz.id = s.id_size ");
        }

        if (productSearchBuilder.getCategories() != null && !productSearchBuilder.getCategories().isEmpty()) {
            sql.append(" JOIN category ct ON p.category = ct.id ");
        }

        if (productSearchBuilder.getStyle() != null && !productSearchBuilder.getStyle().isEmpty()) {
            sql.append(" JOIN style st ON p.id_style = st.id ");
        }
    }
    private String convertCamelCaseToSnakeCase(String camelCase) {
        return camelCase.replaceAll("([a-z])([A-Z]+)", "$1_$2").toLowerCase();
    }
    // Phương thức sử dụng Reflection để tạo các câu truy vấn tìm kiếm thông thường
    private void queryNomal(ProductSearchBuilder productSearchBuilder, StringBuilder sql) {
        try {
            Field[] fields = productSearchBuilder.getClass().getDeclaredFields();
            for (Field item : fields) {
                item.setAccessible(true); // Cho phép truy cập giá trị field
                String fieldName = item.getName();
                String columnName = convertCamelCaseToSnakeCase(fieldName);
                if (!fieldName.equals("idProductOrder") && !fieldName.equals("idStatus")
                        && !fieldName.equals("priceDiscountFrom") && !fieldName.equals("priceDiscountTo")
                        && !fieldName.equals("style") && !fieldName.equals("categories")
                        && !fieldName.equals("sizes") && !fieldName.equals("saleProduct")) {
                    Object value = item.get(productSearchBuilder);
                    if (value != null && !value.toString().isEmpty()) {
                        if (item.getType().equals(Integer.class) || item.getType().equals(Long.class)
                                || item.getType().equals(Boolean.class) || item.getType().equals(Double.class)) {
                            sql.append(" AND p.").append(columnName).append(" = ").append(value).append(" ");
                        } else {
                            sql.append(" AND p.").append(columnName).append(" LIKE '%").append(value).append("%' ");
                        }
                    }
                }
            }
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        }
    }

    // Phương thức cho các điều kiện đặc biệt
    private void querySpesal(ProductSearchBuilder productSearchBuilder, StringBuilder sql) {
        Long idProductOrder = productSearchBuilder.getIdProductOrder();
        Long idStatus = productSearchBuilder.getIdStatus();

        if (idProductOrder != null) {
            sql.append(" AND o.id = ").append(idProductOrder).append(" ");
        }

        if (idStatus != null) {
            sql.append(" AND p.id_status = ").append(idStatus).append(" ");
        }

        Double priceDiscountFrom = productSearchBuilder.getPriceDiscountFrom();
        Double priceDiscountTo = productSearchBuilder.getPriceDiscountTo();

        if (priceDiscountFrom != null) {
            sql.append(" AND p.price_discount >= ").append(priceDiscountFrom).append(" ");
        }
        if (priceDiscountTo != null) {
            sql.append(" AND p.price_discount <= ").append(priceDiscountTo).append(" ");
        }

        // Xử lý điều kiện với danh sách sizes
        List<String> sizes = productSearchBuilder.getSizes();
        if (sizes != null && !sizes.isEmpty()) {
            sql.append(" AND ( ");
            String sizeCondition = sizes.stream().map(it -> "sz.name = '" + it + "' ")
                    .collect(Collectors.joining(" OR "));
            sql.append(sizeCondition).append(" ) ");
        }

        // Xử lý điều kiện với danh sách styles
        List<String> styles = productSearchBuilder.getStyle();
        if (styles != null && !styles.isEmpty()) {
            sql.append(" AND ( ");
            String styleCondition = styles.stream().map(it -> "st.name = '" + it + "'")
                    .collect(Collectors.joining(" OR "));
            sql.append(styleCondition).append(" ) ");
        }

        // Xử lý điều kiện với danh sách categories
        List<String> categories = productSearchBuilder.getCategories();
        if (categories != null && !categories.isEmpty()) {
            sql.append(" AND ( ");
            String categoryCondition = categories.stream().map(it -> "ct.name = '" + it + "'")
                    .collect(Collectors.joining(" OR "));
            sql.append(categoryCondition).append(" ) ");
        }
    }
}

