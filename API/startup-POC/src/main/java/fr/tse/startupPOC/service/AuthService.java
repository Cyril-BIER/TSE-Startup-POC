package fr.tse.startupPOC.service;

import fr.tse.startupPOC.models.User;
import fr.tse.startupPOC.payload.request.LoginRequest;
import fr.tse.startupPOC.payload.response.JwtResponse;
import fr.tse.startupPOC.repository.MonthReportRepository;
import fr.tse.startupPOC.repository.UserRepository;
import fr.tse.startupPOC.security.jwt.JwtUtils;
import fr.tse.startupPOC.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthService {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    MonthReportRepository monthReportRepository;
    @Autowired
    UserRepository userRepository;

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


        boolean canAddImputation = false;
        if(roles.contains("ROLE_USER")){
            User user = userRepository.findById(userDetails.getId()).get();
            canAddImputation =! monthReportRepository.existsByYearMonthAndUser(YearMonth.now(),user);
        }
        return new JwtResponse(jwt, userDetails.getId(), userDetails.getEmail(),roles,canAddImputation);
    }


}
