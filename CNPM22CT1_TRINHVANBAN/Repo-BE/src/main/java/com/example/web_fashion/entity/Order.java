package com.example.web_fashion.entity;

import com.example.web_fashion.entity.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orders")
@Builder
public class Order extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    //    @Lob nó sẽ tạo ra kiểu dữ liệu TEXT or LONGTEXT
    @Lob
//    @Column(columnDefinition="TEXT")
    private String note;
    @Column(name = "fullname", length = 100)
    private String fullName;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "phone_number",nullable = false, length = 100)
    private String phoneNumber;

    @Column(name = "address", nullable = false, length = 100)
    private String address;

    @Column(name="order_date")
    private LocalDateTime  orderDate;

    @Column(name = "total_money")
    private String totalMoney;

    @Column(name = "shipping_method")
    private String shippingMethod;

    @Column(name = "shipping_address")
    private String shippingAddress;

    @Column(name = "shipping_date")
    private LocalDate shippingDate;
    @Column(name = "active")
    private Boolean active;

    @ManyToOne
    @JoinColumn(name = "id_transport")
    private Transport transport;

    @ManyToOne
    @JoinColumn(name = "id_discount")
    private Discount discount;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "id_statusOrder")
    private OrderStatus orderStatus;
}
