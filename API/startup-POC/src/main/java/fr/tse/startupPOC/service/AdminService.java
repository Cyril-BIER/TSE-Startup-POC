package fr.tse.startupPOC.service;

import fr.tse.startupPOC.models.Admin;
import fr.tse.startupPOC.models.Manager;
import fr.tse.startupPOC.models.Profile;
import fr.tse.startupPOC.models.User;
import fr.tse.startupPOC.payload.request.SignupAdminRequest;
import fr.tse.startupPOC.payload.request.SignupManagerRequest;
import fr.tse.startupPOC.repository.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.naming.AuthenticationException;
import java.util.List;
import java.util.Optional;

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
    @Autowired
    ImputationRepository imputationRepository;
    @Autowired
    AdminRepository adminRepository;

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
        return profileRepository.findById(profileId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + profileId));
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
    public Manager userToManager(Long userId){
        Optional<User> oUser = userRepository.findById(userId);

        if(oUser.isPresent()){
            User user = oUser.get();
            imputationRepository.deleteAll(user.getImputations());
            userRepository.delete(user);
            Manager manager = new Manager(
                    user.getId(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    user.getPassword());
            managerRepository.flush();
            return managerRepository.save(manager);
        }else {
            throw new EntityNotFoundException("User not found with id: " + userId);
        }
    }

    @Transactional
    public Admin userToAdmin(Long userId){
        Optional<User> oUser = userRepository.findById(userId);

        if(oUser.isPresent()){
            User user = oUser.get();
            imputationRepository.deleteAll(user.getImputations());
            userRepository.delete(user);
            Admin admin = new Admin(
                    user.getId(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    user.getPassword());
            adminRepository.flush();
            return adminRepository.save(admin);
        }else {
            throw new EntityNotFoundException("User not found with id: " + userId);
        }
    }
}
