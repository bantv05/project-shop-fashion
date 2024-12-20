package com.example.web_fashion.repository;
import com.example.web_fashion.entity.user.UserRoleEntity;
import com.example.web_fashion.repository.custom.UserRoleCustom;
import org.springframework.data.jpa.repository.JpaRepository;



public interface IUserRoleRepository extends JpaRepository<UserRoleEntity, Long>, UserRoleCustom {
    void deleteByUserId(Long userId);
}
