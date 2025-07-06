package com.fashionhub.user_service.service;

import com.fashionhub.user_service.dto.RegisterRequest;
import com.fashionhub.user_service.dto.LoginRequest;
import com.fashionhub.user_service.dto.UserResponse;

public interface UserService {
    UserResponse register(RegisterRequest registerRequest);
    UserResponse login(LoginRequest loginRequest);
}
