package com.fashionhub.user_service.service.impl;

import com.fashionhub.user_service.dto.RegisterRequest;
import com.fashionhub.user_service.dto.LoginRequest;
import com.fashionhub.user_service.dto.UserResponse;
import com.fashionhub.user_service.entity.User;
import com.fashionhub.user_service.exception.InvalidCredentialsException;
import com.fashionhub.user_service.exception.UserNotFoundException;
import com.fashionhub.user_service.repository.UserRepository;
import com.fashionhub.user_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserResponse register(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("User already exists with email: " + registerRequest.getEmail());
        }

        if (!registerRequest.getPassword().equals(registerRequest.getConfirmPassword())) {
            throw new RuntimeException("Passwords do not match");
        }

        User user = User.builder()
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .email(registerRequest.getEmail())
                .password(registerRequest.getPassword())
                .phoneNumber(registerRequest.getPhoneNumber())
                .build();

        User savedUser = userRepository.save(user);

        return new UserResponse(
                savedUser.getUserId(),
                savedUser.getFirstName(),
                savedUser.getLastName(),
                savedUser.getEmail(),
                savedUser.getPhoneNumber()
        );
    }

    @Override
    public UserResponse login(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + loginRequest.getEmail()));

        if (!user.getPassword().equals(loginRequest.getPassword())) {
            throw new InvalidCredentialsException("Invalid password");
        }

        return new UserResponse(
                user.getUserId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPhoneNumber()
        );
    }
}
