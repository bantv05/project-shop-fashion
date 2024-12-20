package com.example.web_fashion.controller;

import com.example.web_fashion.entity.Transport;
import com.example.web_fashion.exception.DataNotFoundException;
import com.example.web_fashion.service.ITransportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("${api.prefix}/transport")
public class TransportController {
    @Autowired
    private ITransportService iTransportService;
    @GetMapping("")//ok
    public ResponseEntity<List<Transport>> findAll(){
        List<Transport> transports = iTransportService.getTransports();
        if(transports.isEmpty()){
            ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(transports);
    }

    @GetMapping("{id}")//ok
    public ResponseEntity<Transport> findById(@PathVariable Long id) throws DataNotFoundException {
        Transport transports = iTransportService.findById(id);
        if(transports == null){
            ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(transports);
    }
}
