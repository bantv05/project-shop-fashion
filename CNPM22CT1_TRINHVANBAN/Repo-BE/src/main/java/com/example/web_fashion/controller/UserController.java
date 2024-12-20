package com.example.web_fashion.controller;
import com.example.web_fashion.entity.user.User;
import com.example.web_fashion.exception.DataNotFoundException;
import com.example.web_fashion.model.dto.UserDTO;
import com.example.web_fashion.model.dto.UserLoginDTO;
import com.example.web_fashion.model.responses.LoginResponse;
import com.example.web_fashion.model.responses.RegisterResponse;
import com.example.web_fashion.service.IUserService;
import com.example.web_fashion.utils.MessageKey;
import com.example.web_fashion.utils.OnCreate;
import com.example.web_fashion.utils.OnUpdate;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("${api.prefix}/users/")//done
public class UserController {
    @Autowired
    private IUserService iUserService;

    @PostMapping("register")//ok
    public ResponseEntity<RegisterResponse> createUser(@Validated(OnCreate.class) @RequestBody UserDTO userDTO, BindingResult result){
        RegisterResponse registerResponse = new RegisterResponse();
        if(result.hasErrors()){
            List<String> errorMessage = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            registerResponse.setMessage(errorMessage.toString());
            return ResponseEntity.badRequest().body(registerResponse);
        }

        if(!userDTO.getPassword().equals(userDTO.getRetypePassword())){
            registerResponse.setMessage(MessageKey.PASSWORD_NOT_MATCH);
            return ResponseEntity.badRequest().body(registerResponse);
        }

        try{
            User user = iUserService.createUser(userDTO);
            registerResponse.setMessage(MessageKey.REGISTER_SUCCESS);
            registerResponse.setUser(user);
            return ResponseEntity.ok(registerResponse);
        }catch (Exception ex){
            registerResponse.setMessage(ex.getMessage());
            return ResponseEntity.badRequest().body(registerResponse);
        }
    }

    @PostMapping("login")//ok
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody UserLoginDTO userLoginDTO
            ){
        try {
            LoginResponse loginResponse = iUserService.loginUser(userLoginDTO.getEmail(), userLoginDTO.getPassword());
            return ResponseEntity.ok(LoginResponse.builder()
                                    .message(MessageKey.LOGIN_SUCCESS)
                                    .token(loginResponse.getToken())
                                    .roles(loginResponse.getRoles())
                                    .name(loginResponse.getName()).
                                    build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    LoginResponse.builder()
                            .message(MessageKey.LOGIN_FAILED + e.getMessage())
                            .build()
            );
        }
    }

    @GetMapping("list")//ok
    public ResponseEntity<Page<UserDTO>> showList(@RequestParam(value = "code", required = false) String code,
                                  @RequestParam(value = "pageNumber", defaultValue = "0") int pageNumber,
                                  @RequestParam(value = "pageSize", defaultValue = "10") int pageSize){
        Page<UserDTO> userDTOPage = iUserService.findAllUserWithRole(code, pageNumber, pageSize);
        if(userDTOPage.isEmpty()){
            return ResponseEntity.badRequest().body(userDTOPage);
        }
    return ResponseEntity.ok(userDTOPage);
    }
    @DeleteMapping("delete-user/{id}")//ok
    @ResponseBody
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) throws DataNotFoundException {
        iUserService.deleteUser(id);
        return ResponseEntity.ok().body(MessageKey.USER_IS_LOCKED);
    }
    @PutMapping("update-user/{id}")//ok
    public ResponseEntity<RegisterResponse> updateUserWithRole(@PathVariable("id") Long id,
                                                               @Validated(OnUpdate.class) @RequestBody UserDTO userDTO,
                                                               BindingResult result){
        RegisterResponse registerResponse = new RegisterResponse();
        if (result.hasErrors()){
            List<String> errorMessage = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            registerResponse.setMessage(errorMessage.toString());
            return ResponseEntity.badRequest().body(registerResponse);
        }
        try {
            User user = iUserService.updateUser(id, userDTO);
            registerResponse.setMessage(MessageKey.UPDATE_SUCCESS);
            registerResponse.setUser(user);
            return ResponseEntity.ok(registerResponse);
        } catch (DataNotFoundException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @GetMapping("detail-user/{id}")//ok
    public UserDTO getDetailUser(@PathVariable Long id){
        try {
            Long userId = Long.parseLong(String.valueOf(id));
            return iUserService.getUserByIdDTO(userId);
        }catch (DataNotFoundException e) {
                throw new RuntimeException(e);
        }
    }
}
