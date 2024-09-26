package com.hgbaodev.backend;

import com.hgbaodev.backend.service.AuthenticationService;
import com.hgbaodev.backend.request.auth.RegisterRequest;
import com.hgbaodev.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import static com.hgbaodev.backend.enums.Role.*;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(
			AuthenticationService service,
			UserRepository userRepository
	) {
		return args -> {
			registerIfNotExists(service, userRepository, createAdminRequest());
			registerIfNotExists(service, userRepository, createManagerRequest());
		};
	}

	private void registerIfNotExists(AuthenticationService service, UserRepository userRepository, RegisterRequest request) {
		if (!userRepository.existsByEmail(request.getEmail())) {
			String token = service.register(request).getAccessToken();
			System.out.println(request.getRole() + " token: " + token);
		} else {
			System.out.println("User with email " + request.getEmail() + " already exists.");
		}
	}

	private RegisterRequest createAdminRequest() {
		return RegisterRequest.builder()
				.firstname("Admin")
				.lastname("Admin")
				.email("admin@mail.com")
				.password("12345678")
				.role(ADMIN)
				.build();
	}

	private RegisterRequest createManagerRequest() {
		return RegisterRequest.builder()
				.firstname("User")
				.lastname("User")
				.email("user@mail.com")
				.password("12345678")
				.role(USER)
				.build();
	}
}