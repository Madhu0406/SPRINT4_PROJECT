package com.fashionhub.user_service.integration;

import com.fashionhub.user_service.dto.LoginRequest;
import com.fashionhub.user_service.dto.RegisterRequest;
import com.fashionhub.user_service.entity.User;
import com.fashionhub.user_service.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class UserServiceIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
        User user = User.builder()
                .firstName("Arjun")
                .lastName("Mehta")
                .email("arjun.mehta@example.com")
                .password("Pass@123")
                .phoneNumber("9812345678")
                .build();
        userRepository.save(user);
    }

    @Test
    void testRegisterUser() throws Exception {
        RegisterRequest registerRequest = new RegisterRequest(
                "Riya",
                "Sharma",
                "riya.sharma@example.com",
                "9876543210",
                "Riya#2024",
                "Riya#2024"
        );

        mockMvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("riya.sharma@example.com"))
                .andExpect(jsonPath("$.firstName").value("Riya"));
    }

    @Test
    void testLoginUser() throws Exception {
        LoginRequest loginRequest = new LoginRequest("arjun.mehta@example.com", "Pass@123");

        mockMvc.perform(post("/api/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("arjun.mehta@example.com"))
                .andExpect(jsonPath("$.firstName").value("Arjun"));
    }
}
