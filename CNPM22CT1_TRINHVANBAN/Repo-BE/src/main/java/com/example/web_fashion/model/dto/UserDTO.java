package com.example.web_fashion.model.dto;

import com.example.web_fashion.entity.BaseEntity;
import com.example.web_fashion.entity.user.RoleEntity;
import com.example.web_fashion.utils.OnCreate;
import com.example.web_fashion.utils.OnUpdate;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDTO {
    @NotBlank(message = "first name is required", groups = {OnCreate.class, OnUpdate.class})
    @JsonProperty("first_name")
    private String firstName;

    @NotBlank(message = "last name is required", groups = {OnCreate.class, OnUpdate.class})
    @JsonProperty("last_name")
    private String lastName;

    @NotBlank(message = "Gender is required", groups = {OnCreate.class, OnUpdate.class})
    private String gender;

    @JsonProperty("date_of_birth")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;

    @NotBlank(message = "Email is required", groups = {OnCreate.class, OnUpdate.class})
    private String email;

    @NotBlank(message = "Password cannot be blank", groups = OnCreate.class) // Chỉ áp dụng khi tạo mới
    private String password;

    @NotBlank(message = "Password retype cannot be blank", groups = OnCreate.class)
    @JsonProperty("retype_password")
    private String retypePassword;

    @JsonProperty("facebook_account_id")
    private Integer facebookAccountId;

    @JsonProperty("google_account_id")
    private Integer googleAccountId;

    @JsonProperty("role_id")
    private String roleCode;
}


