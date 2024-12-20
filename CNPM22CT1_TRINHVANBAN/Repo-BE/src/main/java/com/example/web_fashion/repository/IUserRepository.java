package com.example.web_fashion.repository;

import com.example.web_fashion.entity.user.User;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface IUserRepository extends JpaRepository<User, Integer> {
    Boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
    @Modifying
    @Transactional
    @Query(value = "UPDATE user u SET u.status = 0 WHERE u.id = :id", nativeQuery = true)
    int updateStatusById(@Param("id") Long id);

    Boolean existsById(Long id);
    Optional<User> getUserById(Long id);
    @Query(value = "select u.* from user u " +
            " inner join user_role ur on ur.id_user = u.id " +
            " inner join roles rs on rs.id = ur.id_role " +
            " where rs.code = ?1 ", nativeQuery = true)
    Page<User> getQueryFindAllUserRole(@Param("code") String code, Pageable pageable);

    Optional<User> findById(Long id);
}
