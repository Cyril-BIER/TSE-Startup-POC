package fr.tse.startupPOC.service;

import fr.tse.startupPOC.models.Admin;
import fr.tse.startupPOC.models.Profile;
import fr.tse.startupPOC.payload.request.LoginRequest;
import fr.tse.startupPOC.payload.request.SignupAdminRequest;
import fr.tse.startupPOC.payload.response.JwtResponse;
import fr.tse.startupPOC.repository.ProfileRepository;
import fr.tse.startupPOC.security.jwt.JwtUtils;
import fr.tse.startupPOC.security.services.UserDetailsImpl;
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
import java.util.stream.Collectors;

@Service
public class AuthService {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    ProfileRepository profileRepository;
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
}
