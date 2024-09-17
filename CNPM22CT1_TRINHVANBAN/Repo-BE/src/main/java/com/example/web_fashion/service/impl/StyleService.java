package com.example.web_fashion.service.impl;

import com.example.web_fashion.model.Style;
import com.example.web_fashion.service.IStyleService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class StyleService implements IStyleService {
    private IStyleService iStyleService;
    @Override
    public List<Style> getStyles() {
        return iStyleService.getStyles();
    }
}
