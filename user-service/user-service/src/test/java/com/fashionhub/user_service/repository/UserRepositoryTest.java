package com.fashionhub.user_service.repository;

import com.fashionhub.user_service.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE) // Use real DB
@ActiveProfiles("test") // Use application-test.properties
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

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
    void testFindByEmail() {
        Optional<User> found = userRepository.findByEmail("arjun.mehta@example.com");
        assertThat(found).isPresent();
        assertThat(found.get().getFirstName()).isEqualTo("Arjun");
    }
}
