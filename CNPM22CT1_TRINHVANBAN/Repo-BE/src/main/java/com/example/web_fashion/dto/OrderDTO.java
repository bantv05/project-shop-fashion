package com.example.web_fashion.dto;

import com.example.web_fashion.model.Discount;
import com.example.web_fashion.model.Transport;
import com.example.web_fashion.model.user.User;
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
public class OrderDTO {
    private Long id;
    private LocalDateTime dateOrderedDateTime;
    private String note;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String address;
    private LocalDateTime  orderDate;
    private String status;
    private Float totalMoney;
    private String shippingMethod;
    private String shippingAddress;
    private LocalDate shippingDate;
    private Transport transport;
    private Discount discount;
    private User user;
}
