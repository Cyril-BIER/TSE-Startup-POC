package fr.tse.startupPOC.service;

import fr.tse.startupPOC.controller.ProjectController;
import fr.tse.startupPOC.models.Manager;
import fr.tse.startupPOC.models.Project;
import fr.tse.startupPOC.models.User;
import fr.tse.startupPOC.payload.request.createProjectRequest;
import fr.tse.startupPOC.repository.ManagerRepository;
import fr.tse.startupPOC.repository.ProjectRepository;
import fr.tse.startupPOC.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.naming.AuthenticationException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    ManagerRepository managerRepository;

    @Transactional
    public Project createProjectService(createProjectRequest request) throws AuthenticationException {

        UserDetailsImpl userDetails =
                (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Optional<Manager> manager = managerRepository.findById(userDetails.getId());
        Project project = new Project(
                request.getProjectName(),
                manager.get()
        );
        return projectRepository.save(project);
    }

    @Transactional
    public List<Project> getAllProjects(){
        return projectRepository.findAll();
    }

}
