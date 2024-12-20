package com.example.web_fashion.repository;

import com.example.web_fashion.entity.user.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IRoleRepository extends JpaRepository<RoleEntity, Long> {
    @Query(value = "SELECT r.* " +
            "FROM user_role ur " +
            "INNER JOIN roles r ON r.id = ur.id_role " +
            "WHERE ur.id_user = ?1", nativeQuery = true)
    List<RoleEntity> getRoleByIdUser(Long idUser);
    @Query(value = "SELECT r.* " +
            "FROM roles r " +
            "WHERE r.code = :code", nativeQuery = true)
    RoleEntity findByCode(@Param("code") String code);
}
