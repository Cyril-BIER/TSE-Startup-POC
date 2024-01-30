package fr.tse.startupPOC.service;

import fr.tse.startupPOC.controller.ProjectController;
import fr.tse.startupPOC.models.Project;
import fr.tse.startupPOC.models.User;
import fr.tse.startupPOC.payload.request.createProjectRequest;
import fr.tse.startupPOC.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.naming.AuthenticationException;
import java.util.Collections;
import java.util.List;

@Service
public class ProjectService {

    @Autowired
    ProjectRepository projectRepository;

    @Transactional
    public Project createProjectService(createProjectRequest request) throws AuthenticationException {

        List<User> projectUsers = request.getProjectUsers();
        if (projectUsers == null) {
            projectUsers = Collections.emptyList();
        }
        Project project = new Project(
                request.getProjectName(),
                request.getManagerName(),
                projectUsers
        );
        return projectRepository.save(project);
    }

    @Transactional
    public List<Project> getAllProjects(){
        return projectRepository.findAll();
    }

}
