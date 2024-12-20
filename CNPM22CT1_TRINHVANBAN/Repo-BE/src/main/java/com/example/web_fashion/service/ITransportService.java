package com.example.web_fashion.service;

import com.example.web_fashion.entity.Transport;
import com.example.web_fashion.exception.DataNotFoundException;

import java.util.List;

public interface ITransportService {
    List<Transport> getTransports();
    Transport findById(Long id) throws DataNotFoundException;
}
