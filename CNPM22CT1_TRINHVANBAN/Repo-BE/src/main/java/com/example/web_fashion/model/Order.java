package com.example.web_fashion.model;

import com.example.web_fashion.model.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime dateOrderedDateTime;
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

    @Column(name = "status")
    private String status;

    @Column(name = "total_money")
    private Float totalMoney;

    @Column(name = "shipping_method")
    private String shippingMethod;

    @Column(name = "shipping_address")
    private String shippingAddress;

    @Column(name = "shipping_date")
    private LocalDate shippingDate;

    @ManyToOne
    @JoinColumn(name = "id_transport")
    private Transport transport;

    @ManyToOne
    @JoinColumn(name = "id_discount")
    private Discount discount;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
