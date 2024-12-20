package com.example.web_fashion.service.impl;

import com.example.web_fashion.entity.user.RoleEntity;
import com.example.web_fashion.repository.IRoleRepository;
import com.example.web_fashion.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService implements IRoleService {
    @Autowired
    private IRoleRepository iRoleRepository;
    @Override
    public List<RoleEntity> findAll() {
        return iRoleRepository.findAll();
    }
}
