package com.example.web_fashion.repository;

import com.example.web_fashion.model.Transport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITransportRepository extends JpaRepository<Transport, Integer> {
}
