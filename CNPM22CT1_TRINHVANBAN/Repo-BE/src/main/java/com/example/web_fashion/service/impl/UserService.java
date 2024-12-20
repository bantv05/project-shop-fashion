package com.example.web_fashion.service.impl;

import com.example.web_fashion.components.JwtTokenUtils;
import com.example.web_fashion.entity.user.RoleEntity;
import com.example.web_fashion.entity.user.User;
import com.example.web_fashion.entity.user.UserRoleEntity;
import com.example.web_fashion.exception.DataNotFoundException;
import com.example.web_fashion.exception.PermissionDenyException;
import com.example.web_fashion.model.dto.UserDTO;
import com.example.web_fashion.model.responses.LoginResponse;
import com.example.web_fashion.repository.IRoleRepository;
import com.example.web_fashion.repository.IUserRepository;
import com.example.web_fashion.repository.IUserRoleRepository;
import com.example.web_fashion.service.IUserService;
import com.example.web_fashion.utils.MessageKey;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService implements IUserService {
    @Autowired
    private IUserRepository iUserRepository;
    @Autowired
    private IRoleRepository iRoleRepository;
    @Autowired
    private IUserRoleRepository iUserRoleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenUtils jwtTokenUtils;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    @org.springframework.transaction.annotation.Transactional
    public User createUser(UserDTO userDTO) throws PermissionDenyException {
        Boolean checkEmail = iUserRepository.existsByEmail(userDTO.getEmail());
        if(checkEmail){
            throw new DataIntegrityViolationException("Email already exists");
        }
//        RoleEntity role = iRoleRepository.findByCode(RoleEntity.USER);
        RoleEntity role = iRoleRepository.findByCode(userDTO.getRoleCode());

//        if (role.getCode().toUpperCase().equals(RoleEntity.ADMIN)){
//            throw new PermissionDenyException("You cannot register an admin account");
//        }

        User user =User.builder()
                .fullName(userDTO.getFirstName() + " ".repeat(1) + userDTO.getLastName())
                .email(userDTO.getEmail())
                .password(userDTO.getPassword())
                .status(true)
                .gender(userDTO.getGender())
                .dateOfBirth(userDTO.getDateOfBirth())
                .facebookAccountId(userDTO.getFacebookAccountId())
                .googleAccountId(userDTO.getGoogleAccountId())
                .build();

        List<UserRoleEntity> userRoleEntities = new ArrayList<>();
        UserRoleEntity userRole = new UserRoleEntity();
        userRole.setRole(role);
        userRole.setUser(user);
        iUserRoleRepository.save(userRole);
        userRoleEntities.add(userRole);

        user.setUserRoles(userRoleEntities);

        if(userDTO.getFacebookAccountId() == 0 || userDTO.getGoogleAccountId() == 0){
            String password = userDTO.getPassword();
            String encodedPass = passwordEncoder.encode(password);
            user.setPassword(encodedPass);
        }
        return iUserRepository.save(user);
    }

    @Override
    public LoginResponse loginUser(String email, String password /*, Long roleId*/) throws Exception {
        Optional<User> userOptional = iUserRepository.findByEmail(email);
        if(userOptional.isEmpty()){
            throw new DataNotFoundException(MessageKey.WRONG_EMAIL_PASSWORD);
        }
        User existingUser = userOptional.get();
        if(existingUser.getFacebookAccountId() == 0 || existingUser.getGoogleAccountId() == 0 ){
            if (!passwordEncoder.matches(password, existingUser.getPassword())){
                throw new BadCredentialsException(MessageKey.WRONG_EMAIL_PASSWORD);
            }
        }

        List<RoleEntity> optionalRole = iRoleRepository.getRoleByIdUser(existingUser.getId());
        if(optionalRole.isEmpty() /*|| !isUserHasRole(roleId, existingUser)*/){
            throw new DataNotFoundException(MessageKey.ROLE_EXIT);
        }
        if (!userOptional.get().isStatus()){
            throw new DataNotFoundException(MessageKey.USER_IS_LOCKED);
        }

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
            email,password, existingUser.getAuthorities()
        );

        authenticationManager.authenticate(authenticationToken);
        String token = jwtTokenUtils.generateToken(existingUser);
        return new LoginResponse(token, optionalRole, existingUser.getFullName());
    }


    @Override
    public Page<UserDTO> findAllUserWithRole(String code, Integer pageNumber, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<User> users = iUserRepository.getQueryFindAllUserRole(code, pageable);
        List<UserDTO> userDTOList = new ArrayList<>();
        for (User i: users){
            UserDTO getUserDTO = modelMapper.map(i, UserDTO.class);
            String[] nameParts = i.getFullName().trim().split(" ");
            if (nameParts.length > 1){
                getUserDTO.setFirstName(nameParts[0]);
                getUserDTO.setLastName(nameParts[nameParts.length - 1]);
            } else if (nameParts.length == 1) {
                getUserDTO.setFirstName(nameParts[0]);
                getUserDTO.setLastName(" ");
            }
            List<UserRoleEntity> userRoles = i.getUserRoles();
            List<String> longRoles = new ArrayList<>();
            for (UserRoleEntity item: userRoles){
                String roles = modelMapper.map(item.getRole().getCode(), String.class);
                longRoles.add(roles);
            }
            getUserDTO.setRoleCode(longRoles.toString());
            userDTOList.add(getUserDTO);
        }
        return new PageImpl<>(userDTOList, pageable, users.getTotalElements());
    }

    @Override
    public Boolean existsById(Long id) {
        return iUserRepository.existsById(id);
    }
    @Override
    public void deleteUser(Long id) throws DataNotFoundException{
        if (!existsById(id)) {
            throw new DataNotFoundException("This id does not exist");
        }
        iUserRepository.updateStatusById(id);
    }

    @Override
    @Transactional
    public User updateUser(Long id, UserDTO userDTO) throws DataNotFoundException {
        User exitingUser = getUserById(id);
        if(exitingUser != null){
            exitingUser = User.builder()
                    .id(exitingUser.getId()) // Giữ nguyên id cũ
                    .fullName(userDTO.getFirstName() + " " + userDTO.getLastName())
                    .email(userDTO.getEmail())
                    .gender(userDTO.getGender())
                    .dateOfBirth(userDTO.getDateOfBirth())
                    .password(userDTO.getPassword() != null ? passwordEncoder.encode(userDTO.getPassword()) : exitingUser.getPassword()) // Giữ mật khẩu cũ nếu không có mật khẩu mới
                    .userRoles(exitingUser.getUserRoles()) // Giữ nguyên quyền người dùng cũ
//                    .facebookAccountId(exitingUser.getFacebookAccountId())
//                    .googleAccountId(exitingUser.getGoogleAccountId())
//                    .status(true)
                    .build();
            iUserRepository.save(exitingUser);
        }
        return exitingUser;
    }


    @Override
    public User getUserById(Long id) throws DataNotFoundException {
        return  iUserRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("User not found with ID = " + id));
    }

    @Override
    public UserDTO getUserByIdDTO(Long id) throws DataNotFoundException {
        try {
            User user  = getUserById(id);
            UserDTO userDTO = modelMapper.map(user, UserDTO.class);

            String[] nameParts = user.getFullName().split(" ");
            if(nameParts.length > 1){
                userDTO.setFirstName(nameParts[0]);
                userDTO.setLastName(nameParts[nameParts.length - 1]);
            } else if (nameParts.length == 1) {
                userDTO.setFirstName(nameParts[0]);
                userDTO.setLastName(" ");
            }
            userDTO.setPassword(null);
            List<UserRoleEntity> userRoleEntities = user.getUserRoles();
            List<String> strings = new ArrayList<>();
            for (UserRoleEntity i: userRoleEntities){
                Optional<RoleEntity> role = iRoleRepository.findById(i.getRole().getId());
                strings.add(role.get().getName());
            }
            userDTO.setRoleCode(strings.toString());

            return userDTO;
        }catch (DataNotFoundException ex){
            throw new DataNotFoundException("Can't find all  product with code =" + id + ex);
        }



    }
//    private static boolean isUserHasRole(Long roleId, User exUser) {
//        return exUser.getUserRoles().stream()
//                .anyMatch(userRole -> userRole.getRole().getId().equals(roleId));
//    }
}
