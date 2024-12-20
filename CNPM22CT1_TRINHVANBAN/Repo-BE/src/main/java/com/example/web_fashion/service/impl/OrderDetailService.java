package com.example.web_fashion.service.impl;

import com.example.web_fashion.entity.Order;
import com.example.web_fashion.entity.OrderDetail;
import com.example.web_fashion.entity.Product;
import com.example.web_fashion.exception.DataNotFoundException;
import com.example.web_fashion.model.dto.OrderDetailDTO;
import com.example.web_fashion.repository.IOrderDetailRepository;
import com.example.web_fashion.repository.IOrderRepository;
import com.example.web_fashion.repository.IProductRepository;
import com.example.web_fashion.service.IOrderDetailService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import java.time.DateTimeException;

@Service
public class OrderDetailService implements IOrderDetailService {
    @Autowired
    private IOrderRepository iOrderRepository;
    @Autowired
    private IProductRepository iProductRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private IOrderDetailRepository iOrderDetailRepository;

    @Override
    public OrderDetail createOrderDetail(OrderDetailDTO orderDetailDTO) {
        Order order = iOrderRepository.getOrderById(orderDetailDTO.getOrderId())
                .orElseThrow(() -> new DateTimeException("Cannot order with id" + orderDetailDTO.getOrderId() ));
        Product product = iProductRepository.findProductById(orderDetailDTO.getProductId())
                .orElseThrow(() -> new DateTimeException("Cannot product with id" + orderDetailDTO.getProductId()));

        modelMapper.typeMap(OrderDetailDTO.class, OrderDetail.class)
                .addMappings(mapper -> mapper.skip(OrderDetail :: setId));
        OrderDetail orderDetail = new OrderDetail();
        modelMapper.map(orderDetailDTO, orderDetail);
        orderDetail.setProduct(product);
        orderDetail.setOrder(order);
        return iOrderDetailRepository.save(orderDetail);
    }

    @Override
    public OrderDetail updateOrderDetail(Long id, OrderDetailDTO orderDetailDTO) throws DataNotFoundException {
        OrderDetail orderDetailExisting = iOrderDetailRepository.getOrderDetailById(id)
                .orElseThrow(() -> new DateTimeException("Cannot find order detail with id: "+ id));
        Order order = iOrderRepository.getOrderById(orderDetailDTO.getOrderId())
                .orElseThrow(() -> new DateTimeException("Cannot order with id" + orderDetailDTO.getOrderId() ));
        Product product = iProductRepository.findProductById(orderDetailDTO.getProductId())
                .orElseThrow(() -> new DateTimeException("Cannot product with id" + orderDetailDTO.getProductId()));
        modelMapper.typeMap(OrderDetailDTO.class, OrderDetail.class)
                .addMappings(mapper -> mapper.skip(OrderDetail :: setId));

        modelMapper.map(orderDetailDTO, orderDetailExisting);
        orderDetailExisting.setProduct(product);
        orderDetailExisting.setOrder(order);
        return iOrderDetailRepository.save(orderDetailExisting);
    }

    @Override
    public OrderDetail getOrderDetailById(Long id) {
        return iOrderDetailRepository.getOrderDetailById(id)
                .orElseThrow(() -> new DateTimeException("Cannot find order detail with id: "+ id));
    }

    @Override
    public void deleteOrderDetail(Long id) {
        iOrderDetailRepository.getOrderDetailById(id)
                .ifPresent(orderDetail -> iOrderDetailRepository.delete(orderDetail));
    }

    @Override
    public Page<OrderDetailDTO> getFindAllOrderDetail(Integer pageNumber, Integer pageSize) {

        return null;
    }
}
