package com.neuropain.care.controller;


import com.neuropain.care.dto.AuthRequest;
import com.neuropain.care.dto.AuthResponse;
import com.neuropain.care.model.User;
import com.neuropain.care.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend calls
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody AuthRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return new AuthResponse("error", "Email is already registered!", null, null);
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // Securely hash the password
        user.setName(request.getName());
        userRepository.save(user);

        return new AuthResponse("success", "Registration successful!", user.getEmail(), user.getName());
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isPresent() && passwordEncoder.matches(request.getPassword(), userOpt.get().getPassword())) {
            User user = userOpt.get();
            return new AuthResponse("success", "Login successful!", user.getEmail(), user.getName());
        }

        return new AuthResponse("error", "Invalid email or password!", null, null);
    }
}

