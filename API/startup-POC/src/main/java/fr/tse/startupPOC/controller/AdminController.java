package fr.tse.startupPOC.controller;

import fr.tse.startupPOC.models.Admin;
import fr.tse.startupPOC.models.Manager;
import fr.tse.startupPOC.models.Profile;
import fr.tse.startupPOC.payload.request.SignupManagerRequest;
import fr.tse.startupPOC.payload.response.ManagerResponse;
import fr.tse.startupPOC.payload.response.UserResponse;
import fr.tse.startupPOC.service.AdminService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    AdminService adminService;

    @PostMapping("/registerManager")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> registerManager(@Valid @RequestBody SignupManagerRequest request) {
        try {
            Profile profile = adminService.createManager(request);
            return new ResponseEntity<>(profile, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/profile/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Profile getProfile(@PathVariable Long id) {
        return adminService.getProfileById(id);
    }

    @GetMapping("/userToManager/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> userToManager(@PathVariable Long userId) {
        try {
            Manager manager = adminService.userToManager(userId);
            return new ResponseEntity<>(manager, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/userToAdmin/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> userToAdmin(@PathVariable Long userId) {
        try {
            Admin admin = adminService.userToAdmin(userId);
            return new ResponseEntity<>(admin, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/changeManager/{userId}/{managerId}")
    @PreAuthorize("hasRole('ADMIN')")
    public void changeManager(@PathVariable Long userId,
                              @PathVariable Long managerId) {
        adminService.changeManager(userId, managerId);
    }

    @GetMapping("/getAllUsers")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllUsers() {
        try {
            List<UserResponse> response = adminService.getAllUsers();
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getAllManagers")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllManagers() {
        try {
            List<ManagerResponse> response = adminService.getAllManagers();
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
