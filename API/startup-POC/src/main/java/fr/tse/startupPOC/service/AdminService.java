package fr.tse.startupPOC.service;

import fr.tse.startupPOC.models.Admin;
import fr.tse.startupPOC.models.Manager;
import fr.tse.startupPOC.models.Profile;
import fr.tse.startupPOC.models.User;
import fr.tse.startupPOC.payload.request.SignupAdminRequest;
import fr.tse.startupPOC.payload.request.SignupManagerRequest;
import fr.tse.startupPOC.payload.response.UserResponse;
import fr.tse.startupPOC.repository.ManagerRepository;
import fr.tse.startupPOC.repository.ProfileRepository;
import fr.tse.startupPOC.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.naming.AuthenticationException;
import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    ProfileRepository profileRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ManagerRepository managerRepository;
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
    public Profile getProfileById(Long profileId){
        Profile profile = profileRepository.findById(profileId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + profileId));
        return profile;
    }

    @Transactional
    public void changeManager(Long userId, Long managerId){
        User chosenUser = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));
        Manager chosenManager = managerRepository.findById(managerId)
                .orElseThrow(() -> new EntityNotFoundException("Manager not found with id: " + managerId));
        chosenUser.setManager(chosenManager);
        userRepository.save(chosenUser);
    }

    @Transactional
    public List<User> getTotalUsers() {

        return userRepository.findAll();
    }
    @Transactional
    public List<Manager> getAllManagers() {
        return managerRepository.findAll();
    }

    @Transactional
    public Void changeUserRole(Long userId,String role){
        User chosenUser = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));
        if(role == "MANAGER"){
            Manager manager = new Manager(chosenUser.getEmail(), chosenUser.getPassword());
            profileRepository.save(manager);
        } else if (role == "ADMIN") {
            Admin admin = new Admin(chosenUser.getEmail(), chosenUser.getPassword());
            profileRepository.save(admin);
        }
        return null;
    }
}
