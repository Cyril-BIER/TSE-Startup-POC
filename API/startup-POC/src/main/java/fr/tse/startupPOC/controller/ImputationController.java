package fr.tse.startupPOC.controller;

import fr.tse.startupPOC.payload.request.ImputationRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/imputation")
public class ImputationController {

    @PostMapping
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<?> postImputation(@Valid @RequestBody ImputationRequest request){
        try {
            // TODO : Appel à ImputationService
            return new ResponseEntity<>(request, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
