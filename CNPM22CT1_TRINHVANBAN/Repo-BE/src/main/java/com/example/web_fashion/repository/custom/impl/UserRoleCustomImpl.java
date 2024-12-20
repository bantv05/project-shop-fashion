package com.example.web_fashion.repository.custom.impl;

import com.example.web_fashion.repository.custom.UserRoleCustom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Primary
public class UserRoleCustomImpl implements UserRoleCustom {
//    @PersistenceContext
//    private EntityManager entityManager;
//    @Override
//    @Transactional
    public void deleteUserInURole(Long id) {
//       String sql = (" delete from user_role ur where ur.id_user = :idUser ");
//        Query query = entityManager.createNativeQuery(sql);
//        query.setParameter("idUser", id);
//        query.executeUpdate();
//        entityManager.flush();
    }
}
