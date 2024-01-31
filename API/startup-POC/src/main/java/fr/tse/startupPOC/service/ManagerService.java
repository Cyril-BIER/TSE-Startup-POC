package fr.tse.startupPOC.service;

import fr.tse.startupPOC.models.Manager;
import fr.tse.startupPOC.models.User;
import fr.tse.startupPOC.payload.request.SignupUserRequest;
import fr.tse.startupPOC.payload.response.UserResponse;
import fr.tse.startupPOC.repository.ManagerRepository;
import fr.tse.startupPOC.repository.ProfileRepository;
import fr.tse.startupPOC.repository.UserRepository;
import fr.tse.startupPOC.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.naming.AuthenticationException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ManagerService {
    @Autowired
    ManagerRepository managerRepository;

    @Autowired
    ProfileRepository profileRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

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

    @Transactional
    public UserResponse createUser(SignupUserRequest request) throws Exception {
        if(profileRepository.existsByEmail(request.getEmail())){
            throw new AuthenticationException("Email already taken");
        }
        UserDetailsImpl userDetails =
                (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<Manager> manager = managerRepository.findById(userDetails.getId());
        if(manager.isPresent()){
            User user = new User(
                    request.getEmail(),
                    request.getFirstName(),
                    request.getLastName(),
                    encoder.encode(request.getPassword()),
                    manager.get()
            );
            user = userRepository.save(user);

            manager.get().addUser(user);
            managerRepository.save(manager.get());
            return  new UserResponse(user);
        }else{
            throw new Exception("User not created");
        }
    }
}
