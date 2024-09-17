package com.example.web_fashion.repository;

import com.example.web_fashion.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IStatusRepository extends JpaRepository<Status, Integer> {
}
