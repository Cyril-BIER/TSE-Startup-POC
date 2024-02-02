package fr.tse.startupPOC.service;

import fr.tse.startupPOC.models.*;
import fr.tse.startupPOC.payload.request.SignupUserRequest;
import fr.tse.startupPOC.payload.request.createProjectRequest;
import fr.tse.startupPOC.payload.response.ImputationResponse;
import fr.tse.startupPOC.payload.response.MonthReportResponse;
import fr.tse.startupPOC.payload.response.ProjectResponse;
import fr.tse.startupPOC.payload.response.UserResponse;
import fr.tse.startupPOC.repository.ManagerRepository;
import fr.tse.startupPOC.repository.ProfileRepository;
import fr.tse.startupPOC.repository.ProjectRepository;
import fr.tse.startupPOC.repository.UserRepository;
import fr.tse.startupPOC.security.services.UserDetailsImpl;
import jakarta.persistence.EntityNotFoundException;
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

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    MonthReportService monthReportService;

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

    @Transactional
    public ProjectResponse createProject(createProjectRequest request) {

        UserDetailsImpl userDetails =
                (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        List<User> userList = new ArrayList<>();
        if(!request.getProjectUsers().isEmpty()){
            userList = userRepository.findByIdIn(request.getProjectUsers());
        }
        Manager manager = managerRepository.findById(userDetails.getId()).get();
        Project project = new Project(
                request.getProjectName(),
                manager,
                userList
        );
        project = projectRepository.save(project);

        manager.addProject(project);
        managerRepository.save(manager);

        for(User user : userList){
            user.addProject(project);
        }
        userRepository.saveAll(userList);

        return new ProjectResponse(project);
    }

    public List<ProjectResponse> getProjects(){
        List<ProjectResponse> reponse = new ArrayList<>();
        UserDetailsImpl userDetails =
                (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Manager manager = managerRepository.findById(userDetails.getId()).get();
        for(Project project:manager.getProjects()){
            reponse.add(new ProjectResponse(project));
        }
        return reponse;
    }

    public List<ImputationResponse> getImputations(Long userId){
        Optional<User> user = userRepository.findById(userId);
        if(user.isEmpty()){
            throw new EntityNotFoundException("User with id "+userId+" not found");
        }else {
            List<ImputationResponse> response = new ArrayList<>();
            for(Imputation imputation:user.get().getImputations()){
                response.add(new ImputationResponse(imputation));
            }
            return response;
        }
    }

    public MonthReportResponse generateReport(Long userId){
       MonthReport monthReport = monthReportService.generateReport(userId);
       return new MonthReportResponse(monthReport);
    }
}
