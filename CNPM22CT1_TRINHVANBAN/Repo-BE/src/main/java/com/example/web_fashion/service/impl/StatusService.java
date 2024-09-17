package com.example.web_fashion.service.impl;

import com.example.web_fashion.model.Status;
import com.example.web_fashion.repository.IStatusRepository;
import com.example.web_fashion.service.IStatusService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class StatusService implements IStatusService {
    private IStatusRepository statusRepository;
    @Override
    public List<Status> getStatus() {
        return statusRepository.findAll();
    }
}
