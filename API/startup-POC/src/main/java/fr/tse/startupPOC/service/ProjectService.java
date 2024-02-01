package fr.tse.startupPOC.service;

import fr.tse.startupPOC.models.Manager;
import fr.tse.startupPOC.models.Project;
import fr.tse.startupPOC.models.User;
import fr.tse.startupPOC.payload.request.createProjectRequest;
import fr.tse.startupPOC.payload.response.ProjectResponse;
import fr.tse.startupPOC.repository.ManagerRepository;
import fr.tse.startupPOC.repository.ProjectRepository;
import fr.tse.startupPOC.repository.UserRepository;
import fr.tse.startupPOC.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.naming.AuthenticationException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectService {

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    ManagerRepository managerRepository;

    @Autowired
    UserRepository userRepository;

    @Transactional
    public ProjectResponse createProjectService(createProjectRequest request) throws AuthenticationException {

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

    @Transactional
    public List<ProjectResponse> getAllProjects(){
        List<Project> projects = projectRepository.findAll();
        List<ProjectResponse> response = new ArrayList<>();

        for(Project project:projects){
            response.add(new ProjectResponse(project));
        }
        return response;
    }

}
