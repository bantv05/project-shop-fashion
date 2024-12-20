package com.example.web_fashion.controller;

import com.example.web_fashion.service.ISizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("${api.prefix}/size/")//ok
public class SizeController {
    @Autowired
    private ISizeService iSizeService;
    @GetMapping("find-all")
    public ResponseEntity<?> findAllCate(){
        try {
            return ResponseEntity.ok(iSizeService.getSizeList());
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex);
        }
    }
}
