package com.example.web_fashion.repository;

import com.example.web_fashion.entity.Transport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ITransportRepository extends JpaRepository<Transport, Integer> {
    Optional<Transport> findById(Long id);
}
