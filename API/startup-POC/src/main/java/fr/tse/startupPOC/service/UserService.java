package fr.tse.startupPOC.service;

import fr.tse.startupPOC.models.Imputation;
import fr.tse.startupPOC.models.Project;
import fr.tse.startupPOC.models.User;
import fr.tse.startupPOC.payload.request.ImputationRequest;
import fr.tse.startupPOC.payload.response.ImputationResponse;
import fr.tse.startupPOC.payload.response.ProjectResponse;
import fr.tse.startupPOC.repository.ImputationRepository;
import fr.tse.startupPOC.repository.ProjectRepository;
import fr.tse.startupPOC.repository.UserRepository;
import fr.tse.startupPOC.security.services.UserDetailsImpl;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    ProjectRepository projectRepository;
    @Autowired
    ImputationRepository imputationRepository;

    public List<ProjectResponse> getProjects(){
        List<ProjectResponse> reponse = new ArrayList<>();
        UserDetailsImpl userDetails =
                (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userDetails.getId()).get();

        for(Project project: user.getProjects()){
            reponse.add(new ProjectResponse(project));
        }

        return reponse;
    }

    @Transactional
    public ImputationResponse addImputation(ImputationRequest request){
            UserDetailsImpl userDetails =
                    (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            User user = userRepository.findById(userDetails.getId()).get();

            Optional<Project> oProject = projectRepository.findById(request.getProjectId());
            Project project;
            if(oProject.isPresent())
            {
                project = oProject.get();
            }else {
                throw new EntityNotFoundException("Project not found!");
            }

            Imputation imputation = new Imputation(user,project,request.getDate(), request.getDuration());
            imputation = imputationRepository.save(imputation);

            user.addImputation(imputation);
            userRepository.save(user);
            return new ImputationResponse(imputation);
    }

    public List<ImputationResponse> getImputation(){
        List<ImputationResponse> reponse = new ArrayList<>();

        UserDetailsImpl userDetails =
                (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userDetails.getId()).get();
        for(Imputation imputation: user.getImputations()){
            reponse.add(new ImputationResponse(imputation));
        }

        return reponse;
    }
}
