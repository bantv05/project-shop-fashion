package com.example.web_fashion.controller;

import com.example.web_fashion.entity.OrderDetail;
import com.example.web_fashion.model.dto.OrderDetailDTO;
import com.example.web_fashion.service.IOrderDetailService;
import com.example.web_fashion.utils.MessageKey;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("${api.prefix}/orders-detail")
@RequiredArgsConstructor
public class OrderDetailController {
    private final IOrderDetailService iOrderDetailService;
    @PostMapping("create")
    public ResponseEntity<?> createOrderDetail(@Valid @RequestBody OrderDetailDTO orderDetailDTO,
                                               BindingResult result){
        try {
            if (result.hasErrors()){
                List<String> message = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(message);
            }
            OrderDetail orderDetail = iOrderDetailService.createOrderDetail(orderDetailDTO);
            return ResponseEntity.ok(orderDetail);
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex);
        }
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> updateOrderDetail(@PathVariable(name = "id") Long id,@Valid @RequestBody OrderDetailDTO orderDetailDTO,
                                               BindingResult result){
        try {
            if (result.hasErrors()){
                List<String> message = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(message);
            }
            OrderDetail orderDetail = iOrderDetailService.updateOrderDetail(id,orderDetailDTO);
            return ResponseEntity.ok(orderDetail);
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex);
        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteOrderDetail(@PathVariable(name = "id") Long id){
        iOrderDetailService.deleteOrderDetail(id);
        return ResponseEntity.ok(MessageKey.DELETE_ORDER_SUCCESSFULLY);
    }

    @GetMapping("{id}")//ok
    public ResponseEntity<?> getOrderDetail(@PathVariable(name = "id") Long id){
        OrderDetail orderDetail = iOrderDetailService.getOrderDetailById(id);
        return ResponseEntity.ok(orderDetail);
    }
}
