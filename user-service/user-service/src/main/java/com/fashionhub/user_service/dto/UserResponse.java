package com.fashionhub.user_service.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private Integer userId;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
}
