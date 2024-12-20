package com.example.web_fashion.controller;

import com.example.web_fashion.entity.Discount;
import com.example.web_fashion.exception.DataNotFoundException;
import com.example.web_fashion.service.IDiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("${api.prefix}/discount/")//ok

public class DiscountController {
    @Autowired
    private IDiscountService iDiscountService;
    @GetMapping("find-all")//ok
    public List<Discount> getAllDiscount(){
        return iDiscountService.findAllDiscount();
    }
    @GetMapping("{id}")//ok
    public Discount findByIdDiscount(@PathVariable(name = "id") Long id) throws DataNotFoundException {
        return iDiscountService.getByIdDiscount(id);
    }
}
