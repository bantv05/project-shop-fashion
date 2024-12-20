package com.example.web_fashion.controller;

import com.example.web_fashion.entity.OrderStatus;
import com.example.web_fashion.entity.StatusProduct;
import com.example.web_fashion.service.IOrderStatusService;
import com.example.web_fashion.service.IProductStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin("*")
@RestController
@RequestMapping("${api.prefix}/status")
public class StatusController {
    @Autowired
    private IProductStatusService iProductStatusService;
    @Autowired
    private IOrderStatusService iOrderStatusService;

    @GetMapping("product")//ok
    public List<StatusProduct> getFindAllProduct(){
        return iProductStatusService.getFindAllStatus();
    }
    @GetMapping("product/{id}")//ok
    public StatusProduct getFindByIdProduct(@PathVariable(name = "id") Long id){
        return iProductStatusService.findByIdStatus(id);
    }
    @GetMapping("order")//ok
    public List<OrderStatus> getFindAllOrder(){
        return iOrderStatusService.findAllStatusOrder();
    }
    @GetMapping("order/{id}")//ok
    public Optional<OrderStatus> getFindByIdOrder(@PathVariable(name = "id") Long id){
        return iOrderStatusService.findByIdStatusOrder(id);
    }
}
