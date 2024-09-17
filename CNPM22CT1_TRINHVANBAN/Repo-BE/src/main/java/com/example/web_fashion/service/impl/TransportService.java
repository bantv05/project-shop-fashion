package com.example.web_fashion.service.impl;

import com.example.web_fashion.model.Transport;
import com.example.web_fashion.repository.ITransportRepository;
import com.example.web_fashion.service.ITransportService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TransportService  implements ITransportService {
    private ITransportRepository transportRepository;
    @Override
    public List<Transport> getTransports() {
        return transportRepository.findAll();
    }
}
