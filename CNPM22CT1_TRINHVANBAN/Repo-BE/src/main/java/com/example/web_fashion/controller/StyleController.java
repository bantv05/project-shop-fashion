package com.example.web_fashion.controller;

import com.example.web_fashion.service.IStyleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.service.annotation.GetExchange;

@CrossOrigin("*")
@RestController
@RequestMapping("${api.prefix}/style")//ok
public class StyleController {
    @Autowired
    private IStyleService iStyleService;

    @GetMapping("")
    public ResponseEntity<?> getFindAllStyle(){
        return ResponseEntity.ok(iStyleService.getStyles());
    }
}
