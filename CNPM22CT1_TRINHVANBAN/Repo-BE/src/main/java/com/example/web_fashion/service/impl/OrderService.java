package com.example.web_fashion.service.impl;

import com.example.web_fashion.entity.*;
import com.example.web_fashion.entity.user.User;
import com.example.web_fashion.exception.DataNotFoundException;
import com.example.web_fashion.model.dto.CartItemDTO;
import com.example.web_fashion.model.dto.OrderDTO;
import com.example.web_fashion.repository.*;
import com.example.web_fashion.service.IOrderService;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService implements IOrderService {
    @Autowired
    private IUserRepository iUserRepository;
    @Autowired
    private IOrderRepository iOrderRepository;
    @Autowired
    private IOrderDetailRepository iOrderDetailRepository;
    @Autowired
    private IOrderStatusRepository iOrderStatusRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private IProductRepository iProductRepository;
    @Autowired
    private ITransportRepository iTransportRepository;
    @Autowired
    private IDiscountRepository iDiscountRepository;

    @Override
    @Transactional
    public Order createOrder(OrderDTO orderDTO) throws DataNotFoundException {
        //lay ra cac doi tuong
        User user = iUserRepository.getUserById(orderDTO.getIdUser())
                .orElseThrow(() -> new DataNotFoundException("Cannot find user with id: "+ orderDTO.getIdUser()));
        Discount discount = iDiscountRepository.getDiscountById(orderDTO.getIdDiscount())
                .orElseThrow(() -> new DataNotFoundException("Cannot find discount with id: "+ orderDTO.getIdDiscount()));
        Transport transport = iTransportRepository.findById(orderDTO.getIdTransport())
                .orElseThrow(() -> new DataNotFoundException("Cannot find discount with id: "+ orderDTO.getIdTransport()));
        OrderStatus orderStatus = iOrderStatusRepository.getOrderStatusById(orderDTO.getIdStatusOrder())
                .orElseThrow(() -> new DataNotFoundException("Cannot find OrderStatus with id: "+orderDTO.getIdStatusOrder()));
        LocalDate localDate = orderDTO.getShippingDate() == null
                ? LocalDate.now().plusDays(2) : orderDTO.getShippingDate();//cộng thêm 2 ngày chính là ngày dự đoán giao hàng
        //convert từ dto sang entity, tạo luồng ánh xạ riêng để kiểm soát ánh xạ
        //đặt tên mapper để đọc từng record trên toàn vùng dữ liệu, sử dụng skip để bỏ qua thuộc tính không cần chuyển đổi
//        ModelMapper modelMapper = new ModelMapper();
//        modelMapper.typeMap(OrderDTO.class, Order.class)
//                .addMappings(mapper -> {
//                    mapper.skip(Order::setId);
//                    mapper.skip(Order::setUser);
//                    mapper.skip(Order::setOrderDate);
//                    mapper.skip(Order::setDiscount);
//                    mapper.skip(Order::setTransport);
//                    mapper.skip(Order::setOrderStatus);
//                    mapper.skip(Order::setActive);
//                    mapper.skip(Order::setShippingDate);
//                });
        Order order = Order.builder()
                .email(orderDTO.getEmail())
                .note(orderDTO.getNote())
                .address(orderDTO.getAddress())
                .fullName(orderDTO.getFullName())
                .phoneNumber(orderDTO.getPhoneNumber())
                .orderDate(LocalDateTime.now())
                .totalMoney(orderDTO.getTotalMoney())
                .shippingMethod(orderDTO.getShippingMethod())
                .user(user)
                .orderDate(LocalDate.now().atStartOfDay())
                .discount(discount)
                .transport(transport)
                .orderStatus(orderStatus)
                .orderDate(LocalDateTime.now())
                .active(true)
                .shippingDate(localDate).build();
//        order.setUser(user);
//        order.setOrderDate(LocalDate.now().atStartOfDay());
//        order.setDiscount(discount);
//        order.setTransport(transport);
//        order.setOrderStatus(orderStatus);
//        order.setActive(true);
//        order.setShippingDate(localDate);
        iOrderRepository.save(order);
        //tao danh sach cac doi tuong orderDetail tu CartItem
        List<OrderDetail> orderDetails = new ArrayList<>();
        for (CartItemDTO cartItemDTO: orderDTO.getCartItems()){
            OrderDetail orderDetail = new OrderDetail();
            Product product = iProductRepository.findProductById(cartItemDTO.getProductId())
                    .orElseThrow(() -> new DataNotFoundException("Cannot find product with id" + cartItemDTO.getProductId()));
            orderDetail.setOrder(order);
            orderDetail.setProduct(product);
            orderDetail.setNumberOfProducts(cartItemDTO.getQuantity());
            orderDetail.setPrice(product.getPrice().floatValue());
            orderDetail.setColor(product.getColor());
            orderDetail.setTotalMoney((float) (product.getPrice() * cartItemDTO.getQuantity()));
            orderDetails.add(orderDetail);
        }
        float total = 0;
        for (OrderDetail orderDetail: orderDetails){
            total += orderDetail.getTotalMoney();
        }
        DecimalFormat decimalFormat = new DecimalFormat("#,###.#");
        String formattedTotal = decimalFormat.format(total);

        order.setTotalMoney(formattedTotal);
        iOrderDetailRepository.saveAll(orderDetails);
        return order;
    }

    @Override
    public Order updateOrder(Long id, OrderDTO orderDTO) throws DataNotFoundException{
        User user = iUserRepository.getUserById(orderDTO.getIdUser())
                .orElseThrow(() -> new DataNotFoundException("Cannot find user with id: "+ orderDTO.getIdUser()));
        Discount discount = iDiscountRepository.getDiscountById(orderDTO.getIdDiscount())
                .orElseThrow(() -> new DataNotFoundException("Cannot find discount with id: "+ orderDTO.getIdDiscount()));
        Transport transport = iTransportRepository.findById(orderDTO.getIdTransport())
                .orElseThrow(() -> new DataNotFoundException("Cannot find discount with id: "+ orderDTO.getIdTransport()));
        OrderStatus orderStatus = iOrderStatusRepository.getOrderStatusById(orderDTO.getIdStatusOrder())
                .orElseThrow(() -> new DataNotFoundException("Cannot find OrderStatus with id: "+orderDTO.getIdStatusOrder()));
        Order order = iOrderRepository.getOrderById(id).orElseThrow(() -> new DataNotFoundException("Cannot find Order with id: "+id));
        LocalDate localDate = orderDTO.getShippingDate() == null
                ? LocalDate.now().plusDays(2) : orderDTO.getShippingDate();

        order.setEmail(orderDTO.getEmail());
        order.setNote(orderDTO.getNote());
        order.setAddress(orderDTO.getAddress());
        order.setFullName(orderDTO.getFullName());
        order.setPhoneNumber(orderDTO.getPhoneNumber());
        order.setTotalMoney(order.getTotalMoney());
        order.setShippingMethod(orderDTO.getShippingMethod());
        order.setUser(user);
        order.setDiscount(discount);
        order.setTransport(transport);
        order.setOrderStatus(orderStatus);
        order.setActive(true);
        order.setShippingDate(localDate);
        order.setOrderStatus(orderStatus);
        order.setUser(user);
        order.setTransport(transport);
        order.setDiscount(discount);
        return iOrderRepository.save(order);
    }

    @Override
    public Order getOrderById(Long id) throws DataNotFoundException{
        return iOrderRepository.getOrderById(id)
                .orElseThrow(() -> new DataNotFoundException("Cannot find Order with id: "+id));
    }

    @Override
    public void deleteOrder(Long id) {
        Order orderExits = iOrderRepository.getOrderById(id)
                .orElse(null);
        if(orderExits != null){
            orderExits.setActive(false);
            iOrderRepository.save(orderExits);
        }
    }

    @Override
    public List<Order> findByUserId(Long userId) {
        return iOrderRepository.findByUserId(userId);
    }

    @Override
    public Page<OrderDTO> getFindAllOrder(Integer pageNumber, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<Order> orders = iOrderRepository.queryFindAll(pageable);
        List<OrderDTO> orderDTOS = new ArrayList<>();
        for (Order order: orders){
            OrderDTO orderDTO = OrderDTO.builder()
                    .id(order.getId())
                    .idUser(order.getUser().getId())
                    .note(order.getNote())
                    .fullName(order.getFullName())
                    .email(order.getEmail())
                    .phoneNumber(order.getPhoneNumber())
                    .address(order.getAddress())
                    .totalMoney(order.getTotalMoney())
                    .shippingDate(order.getShippingDate())
                    .shippingMethod(order.getShippingMethod())
                    .shippingAddress(order.getShippingAddress())
                    .idTransport(order.getTransport().getId())
                    .idDiscount(order.getDiscount().getId())
                    .idStatusOrder(order.getOrderStatus().getId())
                    .build();
            orderDTOS.add(orderDTO);
        }
        return new PageImpl<>(orderDTOS, pageable, orders.getTotalElements());
    }
}
