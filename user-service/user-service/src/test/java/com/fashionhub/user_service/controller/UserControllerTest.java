package com.fashionhub.user_service.controller;

import com.fashionhub.user_service.config.SecurityConfig;
import com.fashionhub.user_service.dto.LoginRequest;
import com.fashionhub.user_service.dto.RegisterRequest;
import com.fashionhub.user_service.dto.UserResponse;
import com.fashionhub.user_service.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
@Import(SecurityConfig.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    private UserResponse userResponse;
    private LoginRequest loginRequest;
    private RegisterRequest registerRequest;

    @BeforeEach
    void setUp() {
        userResponse = new UserResponse(1, "John", "Doe", "john.doe@example.com", "1234567890");
        loginRequest = new LoginRequest("john.doe@example.com", "password123");
        registerRequest = new RegisterRequest(
                "Jane",
                "Smith",
                "jane.smith@example.com",
                "0987654321",
                "password123",
                "password123"
        );
    }

    @Test
    void testLogin() throws Exception {
        Mockito.when(userService.login(any(LoginRequest.class))).thenReturn(userResponse);

        mockMvc.perform(post("/api/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest))
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("john.doe@example.com"))
                .andExpect(jsonPath("$.firstName").value("John"));
    }

    @Test
    void testRegister() throws Exception {
        Mockito.when(userService.register(any(RegisterRequest.class))).thenReturn(userResponse);

        mockMvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest))
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value("John"))
                .andExpect(jsonPath("$.lastName").value("Doe"));
    }
}
