package fr.tse.startupPOC.controller;

import fr.tse.startupPOC.models.Imputation;
import fr.tse.startupPOC.payload.request.ImputationRequest;
import fr.tse.startupPOC.payload.response.ImputationResponse;
import fr.tse.startupPOC.payload.response.MonthReportResponse;
import fr.tse.startupPOC.payload.response.ProjectResponse;
import fr.tse.startupPOC.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/projects")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getProjects(){
        try{
            List<ProjectResponse> response = userService.getProjects();
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/imputation")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addImputation(@Valid @RequestBody ImputationRequest request){
        try{
            ImputationResponse imputation = userService.addImputation(request);
            return new ResponseEntity<>(imputation, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/imputation")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getImputation(){
        try{
            List<ImputationResponse> response = userService.getImputation();
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/createMonthReport")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createMonthReport(){
        try{
            MonthReportResponse response = userService.generateReport();
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
