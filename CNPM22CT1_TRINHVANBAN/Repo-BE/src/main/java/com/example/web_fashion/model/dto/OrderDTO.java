package com.example.web_fashion.model.dto;

import com.example.web_fashion.entity.Discount;
import com.example.web_fashion.entity.OrderStatus;
import com.example.web_fashion.entity.Transport;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDTO {
    private Long id;
    @JsonProperty("id_user")
//    @Min(value = 1, message = "User's ID must be > 0")
    private Long idUser;
    private String note;
    @JsonProperty("full_name")
    private String fullName;
    private String email;
    @JsonProperty("phone_number")
    @NotBlank(message = "Phone number is required")
    @Size(min = 5, message = "Phone number must be at least 5 characters")
    private String phoneNumber;
    private String address;
    @JsonProperty("total_money")
    @Min(value = 0, message = "Total money must be >= 0")
    private String totalMoney;
    @JsonProperty("shipping_date")
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate shippingDate;
    @JsonProperty("shipping_method")
    private String shippingMethod;
    @JsonProperty("shipping_address")
    private String shippingAddress;
    @JsonProperty("id_transport")
    @Min(value = 1, message = "Transport ID must be > 0")
    private Long idTransport;
    @JsonProperty("id_discount")
    private Long idDiscount;
    @JsonProperty("id_status_order")
    private Long idStatusOrder;
    @JsonProperty("cart_items")
    private List<CartItemDTO> cartItems;
}
