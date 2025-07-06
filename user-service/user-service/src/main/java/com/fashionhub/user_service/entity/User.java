package com.fashionhub.user_service.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Table(name = "user_info") // Table name matches your SQL
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id") // Column name matches your SQL
    private Integer userId;

    @NotBlank(message = "First name is required")
    @Column(name = "firstName", length = 50)
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Column(name = "lastName", length = 50)
    private String lastName;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    @Column(name = "password", length = 100)
    private String password;

    @Email(message = "Please provide a valid email")
    @NotBlank(message = "Email is required")
    @Column(name = "email", unique = true, length = 100)
    private String email;

    @Column(name = "phoneNumber", length = 15)
    private String phoneNumber;
}
