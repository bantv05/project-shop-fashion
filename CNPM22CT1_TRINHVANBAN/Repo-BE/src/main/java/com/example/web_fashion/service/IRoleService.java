package com.example.web_fashion.service;

import com.example.web_fashion.entity.user.RoleEntity;

import java.util.List;

public interface IRoleService {
    List<RoleEntity> findAll();
}
