package com.fashionhub.user_service.service;

import com.fashionhub.user_service.dto.LoginRequest;
import com.fashionhub.user_service.dto.RegisterRequest;
import com.fashionhub.user_service.dto.UserResponse;
import com.fashionhub.user_service.entity.User;
import com.fashionhub.user_service.exception.InvalidCredentialsException;
import com.fashionhub.user_service.exception.UserNotFoundException;
import com.fashionhub.user_service.repository.UserRepository;
import com.fashionhub.user_service.service.impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    private User testUser;
    private LoginRequest loginRequest;
    private RegisterRequest registerRequest;

    @BeforeEach
    void setUp() {
        testUser = User.builder()
                .userId(1)
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@example.com")
                .password("password123")
                .phoneNumber("1234567890")
                .build();

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
    void testLoginSuccess() {
        when(userRepository.findByEmail("john.doe@example.com")).thenReturn(Optional.of(testUser));
        UserResponse response = userService.login(loginRequest);
        assertThat(response.getEmail()).isEqualTo("john.doe@example.com");
    }

    @Test
    void testLoginUserNotFound() {
        when(userRepository.findByEmail("unknown@example.com")).thenReturn(Optional.empty());
        assertThatThrownBy(() -> userService.login(new LoginRequest("unknown@example.com", "password123")))
                .isInstanceOf(UserNotFoundException.class);
    }

    @Test
    void testLoginInvalidPassword() {
        when(userRepository.findByEmail("john.doe@example.com")).thenReturn(Optional.of(testUser));
        assertThatThrownBy(() -> userService.login(new LoginRequest("john.doe@example.com", "wrongpass")))
                .isInstanceOf(InvalidCredentialsException.class);
    }

    @Test
    void testRegisterSuccess() {
        when(userRepository.existsByEmail("jane.smith@example.com")).thenReturn(false);
        when(userRepository.save(any(User.class))).thenReturn(testUser);
        UserResponse response = userService.register(registerRequest);
        assertThat(response.getFirstName()).isEqualTo("John");
    }

    @Test
    void testRegisterUserAlreadyExists() {
        when(userRepository.existsByEmail("jane.smith@example.com")).thenReturn(true);
        assertThatThrownBy(() -> userService.register(registerRequest))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("User already exists");
    }

    @Test
    void testRegisterPasswordMismatch() {
        registerRequest.setConfirmPassword("differentPassword");
        assertThatThrownBy(() -> userService.register(registerRequest))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Passwords do not match");
    }
}
