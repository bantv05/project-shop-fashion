package com.example.web_fashion.service.impl;

import com.example.web_fashion.entity.Style;
import com.example.web_fashion.repository.IStyleRepository;
import com.example.web_fashion.service.IStyleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class StyleService implements IStyleService {
    @Autowired
    private IStyleRepository iStyleRepository;
    @Override
    public List<Style> getStyles() {
        return iStyleRepository.findAll();
    }
}
