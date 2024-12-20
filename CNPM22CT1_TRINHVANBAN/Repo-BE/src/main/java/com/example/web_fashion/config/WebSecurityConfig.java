package com.example.web_fashion.config;

import com.example.web_fashion.entity.user.RoleEntity;
import com.example.web_fashion.filter.JwtTokenFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Role;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.Arrays;
import java.util.List;

import static org.springframework.http.HttpMethod.*;

@Configuration
//@EnableMethodSecurity
@EnableWebSecurity
@EnableWebMvc
@RequiredArgsConstructor
public class WebSecurityConfig {
    private final JwtTokenFilter jwtTokenFilter;
    @Value("${api.prefix}")
    private String apiPrefix;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
//                .cors(Customizer.withDefaults())
//                .csrf(AbstractHttpConfigurer::disable)
                .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(request -> {
                    request
                            .requestMatchers(
                                    String.format("%s/public/search-product/**", apiPrefix)
                            ).permitAll()

                            .requestMatchers(POST,
                                    String.format("%s/users/login", apiPrefix)
                            ).permitAll()

                            .requestMatchers(GET,
                                    String.format("%s/transport", apiPrefix)
                            ).permitAll()

                            .requestMatchers(POST,
                                    String.format("%s/users/register", apiPrefix)
                            ).permitAll()

                            .requestMatchers(GET,
                                    String.format("%s/public/get-detail-product/**", apiPrefix)
                            ).permitAll()

                            .requestMatchers(GET,
                                    String.format("%s/status/product", apiPrefix)
                            ).permitAll()

                            .requestMatchers(GET,
                                    String.format("%s/discount/find-all", apiPrefix)
                            ).permitAll()

                            .requestMatchers(GET,
                                    String.format("%s/category/find-all", apiPrefix)
                            ).permitAll()

                            .requestMatchers(GET,
                                    String.format("%s/size/find-all", apiPrefix)
                            ).permitAll()

                            .requestMatchers(GET,
                                    String.format("%s/style", apiPrefix)
                            ).permitAll()

                            .requestMatchers(
                                    String.format("%s/private/create-product", apiPrefix),
                                    String.format("%s/users/detail-user/**", apiPrefix)

                            ).hasAnyRole(RoleEntity.ADMIN, RoleEntity.STAFF)
                            .requestMatchers(
                                    String.format("%s/users/list-role", apiPrefix),
                                    String.format("%s/users/delete-user/**", apiPrefix),
                                    String.format("%s/users/update-user/**", apiPrefix),
                                    String.format("%s/orders/create", apiPrefix),
                                    String.format("%s/orders/update/**", apiPrefix)
                                    ).hasRole(RoleEntity.ADMIN)

                            .requestMatchers(POST,
                                    String.format("%s/orders/**", apiPrefix)
                                    ).hasRole(RoleEntity.USER)
                            .requestMatchers(PUT,
                                    String.format("%s/orders/**", apiPrefix)
                            ).hasAnyRole(RoleEntity.ADMIN, RoleEntity.STAFF, RoleEntity.TRANSPORT)
                            .requestMatchers(PUT,
                                    String.format("%s/orders/delete/**", apiPrefix)
                            ).hasAnyRole(RoleEntity.ADMIN)

                            .requestMatchers(DELETE,
                                    String.format("%s/orders/**", apiPrefix)
                            ).hasRole(RoleEntity.ADMIN)
                            .requestMatchers(GET,
                                    String.format("%s/orders/**", apiPrefix)
                            ).permitAll()

                            .requestMatchers(POST,
                                    String.format("%s/orders-detail/**", apiPrefix)
                            ).hasRole(RoleEntity.USER)
                            .requestMatchers(PUT,
                                    String.format("%s/orders-detail/**", apiPrefix)
                            ).hasAnyRole(RoleEntity.ADMIN, RoleEntity.STAFF, RoleEntity.TRANSPORT)
                            .requestMatchers(DELETE,
                                    String.format("%s/orders-detail/**", apiPrefix)
                            ).hasRole(RoleEntity.ADMIN)
                            .requestMatchers(GET,
                                    String.format("%s/orders-detail/**", apiPrefix)
                            ).permitAll()

                            .requestMatchers(
                                    String.format("%s/private/update-product", apiPrefix)).hasAnyRole(RoleEntity.TRANSPORT, RoleEntity.ADMIN)
                            .requestMatchers(
                                    String.format("%s/private/delete-product/**", apiPrefix)).hasAnyRole(RoleEntity.STAFF, RoleEntity.ADMIN)
                            .anyRequest().authenticated();
                })
                .csrf(AbstractHttpConfigurer::disable);
        http.cors(new Customizer<CorsConfigurer<HttpSecurity>>() {
//            @Bean
            @Override
            public void customize(CorsConfigurer<HttpSecurity> httpSecurityCorsConfigurer) {
                CorsConfiguration configuration = new CorsConfiguration();
                configuration.setAllowedOrigins(List.of("*"));
                configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
                configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
                configuration.setExposedHeaders(List.of("x-auth-token"));
                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                httpSecurityCorsConfigurer.configurationSource(source);
            }
        });

        return http.build();
    }
}
