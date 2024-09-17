package com.example.web_fashion.service.impl;

import com.example.web_fashion.model.user.User;
import com.example.web_fashion.repository.IUserRepository;
import com.example.web_fashion.service.IUserService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserService implements IUserService {
    private IUserRepository userRepository;
    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }
}
