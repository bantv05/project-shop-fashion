package com.example.web_fashion.repository;

import com.example.web_fashion.entity.Style;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IStyleRepository extends JpaRepository<Style, Integer> {
}
