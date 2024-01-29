package fr.tse.startupPOC.service;

import fr.tse.startupPOC.models.Imputation;
import fr.tse.startupPOC.models.User;
import fr.tse.startupPOC.payload.request.ImputationRequest;
import fr.tse.startupPOC.repository.ImputationRepository;
import fr.tse.startupPOC.repository.UserRepository;
import fr.tse.startupPOC.security.services.UserDetailsImpl;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class ImputationService {
    @Autowired
    ImputationRepository imputationRepository;

    @Autowired
    UserRepository userRepository;

    @Transactional
    public Imputation saveImputation(ImputationRequest request){
        UserDetailsImpl userDetails =
                (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional< User> user = userRepository.findById(userDetails.getId());
        if(user.isEmpty()){
            throw new EntityNotFoundException("Authentication error");
        }
        Imputation imputation = new Imputation(user.get(),request.getDate(), request.getDuration());

        return imputationRepository.save(imputation);
    }
}
