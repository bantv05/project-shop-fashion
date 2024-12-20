package com.example.web_fashion.service.impl;

import com.example.web_fashion.entity.Transport;
import com.example.web_fashion.exception.DataNotFoundException;
import com.example.web_fashion.repository.ITransportRepository;
import com.example.web_fashion.service.ITransportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TransportService  implements ITransportService {
    @Autowired
    private ITransportRepository transportRepository;
    @Override
    public List<Transport> getTransports() {
        return transportRepository.findAll();
    }

    @Override
    public Transport findById(Long id) throws DataNotFoundException {
        return transportRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Cannot transport with id "+ id));
    }
}
