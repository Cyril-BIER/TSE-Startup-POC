package fr.tse.startupPOC.controller;

import fr.tse.startupPOC.payload.request.SignupUserRequest;
import fr.tse.startupPOC.payload.request.createProjectRequest;
import fr.tse.startupPOC.payload.response.ProjectResponse;
import fr.tse.startupPOC.payload.response.UserResponse;
import fr.tse.startupPOC.service.ManagerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/manager")
public class managerController {
    @Autowired
    ManagerService managerService;

    @GetMapping("/attachedUser")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<?> getUser(){
        try {
            return new ResponseEntity<>(managerService.getAttachedUsers(), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/registerUser")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupUserRequest request){
        try {
            UserResponse response = managerService.createUser(request);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/createProject")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<?> createProject(@Valid @RequestBody createProjectRequest request){
        try {
            ProjectResponse project = managerService.createProject(request);
            return new ResponseEntity<>(project, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/projects")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<?> getProjects(){
        try{
            List<ProjectResponse> response = managerService.getProjects();
            return new ResponseEntity<>(response,HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
