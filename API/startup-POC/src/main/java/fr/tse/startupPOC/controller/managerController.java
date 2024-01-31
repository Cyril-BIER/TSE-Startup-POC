package fr.tse.startupPOC.controller;

import fr.tse.startupPOC.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
