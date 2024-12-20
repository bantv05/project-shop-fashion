package com.example.web_fashion.repository;

import com.example.web_fashion.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ISizeRepository extends JpaRepository<Size, Long> {
    Size findByName(String name);
}
