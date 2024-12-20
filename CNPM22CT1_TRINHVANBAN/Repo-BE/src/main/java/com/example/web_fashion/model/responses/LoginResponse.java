package com.example.web_fashion.model.responses;

import com.example.web_fashion.entity.user.RoleEntity;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginResponse {
    @JsonProperty("message")
    private String message;

    @JsonProperty("token")
    private String token;

    @JsonProperty("name")
    private String name;

    @JsonProperty("role")
    private List<RoleEntity> roles;
    public LoginResponse(String token, List<RoleEntity> roles, String name) {
        this.token = token;
        this.roles = roles;
        this.name = name;
    }
}
