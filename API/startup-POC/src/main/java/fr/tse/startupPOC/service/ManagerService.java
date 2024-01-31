package fr.tse.startupPOC.service;

import fr.tse.startupPOC.models.Manager;
import fr.tse.startupPOC.models.User;
import fr.tse.startupPOC.payload.response.UserResponse;
import fr.tse.startupPOC.repository.ManagerRepository;
import fr.tse.startupPOC.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ManagerService {
    @Autowired
    ManagerRepository managerRepository;

    public List<UserResponse> getAttachedUsers(){
        List<UserResponse> response = new ArrayList<>();
        UserDetailsImpl userDetails =
                (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Manager manager = managerRepository.findById(userDetails.getId()).get();

        for(User user:manager.getAttachedUsers()){
            response.add(new UserResponse(user));
        }
        return response;
    }
}
