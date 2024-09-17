package com.example.web_fashion.repository;

import com.example.web_fashion.model.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ISizeRepository extends JpaRepository<Size, Integer> {
}
