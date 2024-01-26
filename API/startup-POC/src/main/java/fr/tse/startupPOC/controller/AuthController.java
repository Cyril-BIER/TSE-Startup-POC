package fr.tse.startupPOC.controller;

import fr.tse.startupPOC.models.Profile;
import fr.tse.startupPOC.payload.request.SignupAdminRequest;
import fr.tse.startupPOC.service.profile.AdminService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AdminService adminService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerAdmin(@Valid @RequestBody SignupAdminRequest request){
        try {
            Profile profile = adminService.createAdmin(request);
            return new ResponseEntity<>(profile, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
