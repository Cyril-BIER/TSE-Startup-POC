package fr.tse.startupPOC.controller;

import fr.tse.startupPOC.models.Imputation;
import fr.tse.startupPOC.payload.request.ImputationRequest;
import fr.tse.startupPOC.service.ImputationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/imputation")
public class ImputationController {
    @Autowired
    ImputationService imputationService;
    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> postImputation(@Valid @RequestBody ImputationRequest request){
        try {
            Imputation imputation = imputationService.saveImputation(request);
            return new ResponseEntity<>(imputation, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
