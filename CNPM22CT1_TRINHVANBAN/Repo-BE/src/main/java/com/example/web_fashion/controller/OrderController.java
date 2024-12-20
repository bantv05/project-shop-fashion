package com.example.web_fashion.controller;

import com.example.web_fashion.entity.Order;
import com.example.web_fashion.entity.user.User;
import com.example.web_fashion.exception.DataNotFoundException;
import com.example.web_fashion.model.dto.OrderDTO;
import com.example.web_fashion.model.dto.ProductDTO;
import com.example.web_fashion.service.IOrderService;
import com.example.web_fashion.utils.MessageKey;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@Transactional
@RestController
@RequestMapping("${api.prefix}/orders")

public class OrderController {
    @Autowired
    private IOrderService iOrderService;
    @GetMapping("/find-all")//ok
    public ResponseEntity<Page<OrderDTO>> getFindAll(@RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber,
                                                              @RequestParam(name = "pageSize", defaultValue = "10") int pageSize
    ) {

        Page<OrderDTO> orderDTOPage = iOrderService.getFindAllOrder( pageNumber, pageSize);
        return ResponseEntity.ok(orderDTOPage);
    }

    @PostMapping("create")//ok
    public ResponseEntity<?> createOrder(@Valid @RequestBody OrderDTO orderDTO, BindingResult bindingResult){
        try {
            if (bindingResult.hasErrors()){
                List<String> mess = bindingResult.getFieldErrors().stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(mess);
            }
            Order order = iOrderService.createOrder(orderDTO);
            return ResponseEntity.ok(order);
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex);
        }
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> updateOrder(@Valid @PathVariable(name = "id") Long id, @RequestBody OrderDTO orderDTO,
                                         BindingResult result) throws DataNotFoundException {
        try {
            if(result.hasErrors()){
                List<String> mess = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(mess);
            }
            Order order = iOrderService.updateOrder(id, orderDTO);
            return ResponseEntity.ok(order);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }
    @PutMapping("delete/{id}")
    @Transactional
    public ResponseEntity<String> deleteOrder(@PathVariable(name = "id") Long idOder) throws DataNotFoundException {
        iOrderService.deleteOrder(idOder);
        return ResponseEntity.ok(MessageKey.DELETE_ORDER_SUCCESSFULLY.toString());
    }

    @GetMapping("{id}")
    public ResponseEntity<?> findByIdOrder(@PathVariable(name = "id") Long idOder){
        try {
            Order order = iOrderService.getOrderById(idOder);
            return ResponseEntity.ok(order);
        } catch (DataNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("user-order/{id}")
    public ResponseEntity<?> getFindUserOrder(@PathVariable(name = "id") Long idUser){
        List<Order> order = iOrderService.findByUserId(idUser);
        return ResponseEntity.ok(order);
    }
}
