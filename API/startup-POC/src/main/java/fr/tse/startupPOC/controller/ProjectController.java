package fr.tse.startupPOC.controller;

import fr.tse.startupPOC.models.Project;
import fr.tse.startupPOC.payload.request.createProjectRequest;
import fr.tse.startupPOC.service.AuthService;
import fr.tse.startupPOC.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class ProjectController {


    @Autowired
    ProjectService projectService;

    @PostMapping("/createProject")
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<?> createProject(@Valid @RequestBody createProjectRequest request){
        try {
            Project project = projectService.createProjectService(request);
            return new ResponseEntity<>(project, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/getAllProjects")
    @PreAuthorize("hasRole('MANAGER')")
    public List<Project> getAllProjects(){
        return projectService.getAllProjects();
    }
}
