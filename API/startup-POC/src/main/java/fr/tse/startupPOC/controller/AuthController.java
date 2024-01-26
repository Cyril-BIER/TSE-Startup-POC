package fr.tse.startupPOC.controller;

import fr.tse.startupPOC.models.Profile;
import fr.tse.startupPOC.payload.request.LoginRequest;
import fr.tse.startupPOC.payload.request.SignupAdminRequest;
import fr.tse.startupPOC.payload.request.SignupManagerRequest;
import fr.tse.startupPOC.payload.response.JwtResponse;
import fr.tse.startupPOC.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest request){
        try {
            JwtResponse jwtResponse = authService.authenticateProfile(request);
            return new ResponseEntity<>(jwtResponse, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerAdmin(@Valid @RequestBody SignupAdminRequest request){
        try {
            Profile profile = authService.createAdmin(request);
            return new ResponseEntity<>(profile, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/registerManager")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> registerManager(@Valid @RequestBody SignupManagerRequest request){
        try {
            Profile profile = authService.createManager(request);
            return new ResponseEntity<>(profile, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
