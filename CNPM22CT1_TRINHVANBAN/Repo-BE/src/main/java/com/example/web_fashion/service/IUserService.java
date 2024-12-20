package com.example.web_fashion.service;
import com.example.web_fashion.entity.user.User;
import com.example.web_fashion.exception.DataNotFoundException;
import com.example.web_fashion.exception.PermissionDenyException;
import com.example.web_fashion.model.dto.UserDTO;
import com.example.web_fashion.model.responses.LoginResponse;
import org.springframework.data.domain.Page;

public interface IUserService {
    User createUser(UserDTO userDTO) throws PermissionDenyException;
    LoginResponse loginUser(String email, String password/*, Long roleId*/) throws Exception;
    void deleteUser(Long id) throws DataNotFoundException;
    Boolean existsById(Long id);
    User updateUser(Long id, UserDTO userDTO) throws DataNotFoundException;
    User getUserById(Long id) throws DataNotFoundException;
    Page<UserDTO> findAllUserWithRole(String code, Integer pageNumber, Integer pageSize);
    UserDTO getUserByIdDTO(Long id) throws DataNotFoundException;

}
