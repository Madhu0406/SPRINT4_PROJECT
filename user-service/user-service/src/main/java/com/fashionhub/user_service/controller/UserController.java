package com.fashionhub.user_service.controller;

import com.fashionhub.user_service.dto.RegisterRequest;
import com.fashionhub.user_service.dto.LoginRequest;
import com.fashionhub.user_service.dto.UserResponse;
import com.fashionhub.user_service.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {
        UserResponse userResponse = userService.register(registerRequest);
        return ResponseEntity.ok(userResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        UserResponse userResponse = userService.login(loginRequest);
        return ResponseEntity.ok(userResponse);
    }
}
