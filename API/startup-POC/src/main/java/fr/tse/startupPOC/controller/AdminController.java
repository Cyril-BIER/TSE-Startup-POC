package fr.tse.startupPOC.controller;

import fr.tse.startupPOC.models.Manager;
import fr.tse.startupPOC.models.Profile;
import fr.tse.startupPOC.models.User;
import fr.tse.startupPOC.payload.request.SignupManagerRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import fr.tse.startupPOC.service.AdminService;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    AdminService adminService;
    @PostMapping("/registerManager")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> registerManager(@Valid @RequestBody SignupManagerRequest request){
        try {
            Profile profile = adminService.createManager(request);
            return new ResponseEntity<>(profile, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/profile/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Profile getProfile(@PathVariable Long id){
        return adminService.getProfileById(id);
    }

    @PutMapping("/updateProfile")
    @PreAuthorize("hasRole('ADMIN')")
    // A changer
    public Void updateProfile(){
      return null;
    }
    @PutMapping("/changeStatus")
    @PreAuthorize("hasRole('ADMIN')")
    public Void changeStatus(){
        Long userId = 11L;
        adminService.changeUserRole(userId,"MANAGER");
        return null;
    }

    @PutMapping("/changeManager")
    @PreAuthorize("hasRole('ADMIN')")
    public void changeManager(Long userId,Long newManagerId){
        adminService.changeManager(userId,newManagerId);
    }

    @GetMapping("/getAllUsers")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers(){
        return adminService.getTotalUsers();
    }

    @GetMapping("/getAllManagers")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Manager> getAllManagers(){
        return adminService.getAllManagers();
    }
}
