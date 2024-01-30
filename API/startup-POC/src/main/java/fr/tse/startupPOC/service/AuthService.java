package fr.tse.startupPOC.service;

import fr.tse.startupPOC.models.Admin;
import fr.tse.startupPOC.models.Manager;
import fr.tse.startupPOC.models.Profile;
import fr.tse.startupPOC.models.User;
import fr.tse.startupPOC.payload.request.LoginRequest;
import fr.tse.startupPOC.payload.request.SignupAdminRequest;
import fr.tse.startupPOC.payload.request.SignupManagerRequest;
import fr.tse.startupPOC.payload.request.SignupUserRequest;
import fr.tse.startupPOC.payload.response.JwtResponse;
import fr.tse.startupPOC.repository.ManagerRepository;
import fr.tse.startupPOC.repository.ProfileRepository;
import fr.tse.startupPOC.security.jwt.JwtUtils;
import fr.tse.startupPOC.security.services.UserDetailsImpl;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.naming.AuthenticationException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AuthService {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    ProfileRepository profileRepository;
    @Autowired
    ManagerRepository managerRepository;
    @Autowired
    PasswordEncoder encoder;


    @Autowired
    JwtUtils jwtUtils;

    public JwtResponse authenticateProfile(LoginRequest request){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return new JwtResponse(jwt, userDetails.getId(), userDetails.getEmail(),roles);
    }

    @Transactional
    public Profile createAdmin(SignupAdminRequest request) throws AuthenticationException {
        if(profileRepository.existsByEmail(request.getEmail())){
            throw new AuthenticationException("Email already taken");
        }
        Admin admin = new Admin(
                request.getEmail(),
                encoder.encode(request.getPassword())
        );
        return profileRepository.save(admin);
    }

    @Transactional
    public Profile createManager(SignupManagerRequest request) throws AuthenticationException {
        if(profileRepository.existsByEmail(request.getEmail())){
            throw new AuthenticationException("Email already taken");
        }
        Manager manager = new Manager(
                request.getEmail(),
                encoder.encode(request.getPassword())
        );
        return profileRepository.save(manager);
    }

    @Transactional
    public Profile createUser(SignupUserRequest request) throws Exception {
        if(profileRepository.existsByEmail(request.getEmail())){
            throw new AuthenticationException("Email already taken");
        }
        UserDetailsImpl userDetails =
                (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<Manager> manager = managerRepository.findById(userDetails.getId());
        if(manager.isPresent()){
            // TODO : Relation bidirectionnelle avec Manager?
            User user = new User(
                    request.getEmail(),
                    request.getFirstName(),
                    request.getLastName(),
                    encoder.encode(request.getPassword()),
                    manager.get()
            );
            return profileRepository.save(user);
        }else{
            throw new Exception("User not created");
        }
    }

}
