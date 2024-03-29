package fr.tse.startupPOC.service;

import fr.tse.startupPOC.models.Imputation;
import fr.tse.startupPOC.models.MonthReport;
import fr.tse.startupPOC.models.Project;
import fr.tse.startupPOC.models.User;
import fr.tse.startupPOC.payload.request.ChangeImputationRequest;
import fr.tse.startupPOC.payload.request.ImputationRequest;
import fr.tse.startupPOC.payload.response.ImputationResponse;
import fr.tse.startupPOC.payload.response.MonthReportResponse;
import fr.tse.startupPOC.payload.response.ProjectResponse;
import fr.tse.startupPOC.repository.ImputationRepository;
import fr.tse.startupPOC.repository.MonthReportRepository;
import fr.tse.startupPOC.repository.ProjectRepository;
import fr.tse.startupPOC.repository.UserRepository;
import fr.tse.startupPOC.security.services.UserDetailsImpl;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.AlreadyBuiltException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    ProjectRepository projectRepository;
    @Autowired
    ImputationRepository imputationRepository;

    @Autowired
    MonthReportRepository monthReportRepository;

    @Autowired
    MonthReportService monthReportService;

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

        if (!monthReportRepository.existsByYearMonthAndUser(YearMonth.from(request.getDate()),user)) {
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
        }else{
            throw new AlreadyBuiltException("The month report for this user has been generated, you can't add Imputation");
        }
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

    public MonthReportResponse generateReport(){
        UserDetailsImpl userDetails =
                (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        MonthReport monthReport = monthReportService.generateReport(userDetails.getId());
        return new MonthReportResponse(monthReport);
    }

    public ImputationResponse changeImputation(ChangeImputationRequest request){
        UserDetailsImpl userDetails =
                (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userDetails.getId()).get();
        if (!monthReportRepository.existsByYearMonthAndUser(YearMonth.now(),user)) {
            Optional<Imputation> oImputation = user.getImputations().stream()
                    .filter( i -> Objects.equals(i.getId(), request.getImputationId()))
                    .findFirst();

            if (oImputation.isEmpty()) {
                throw new EntityNotFoundException("Imputation with Id "+request.getImputationId()+" not found in the imputation of the user");
            }
            Imputation imputation = oImputation.get();
            imputation.setDuration(request.getDuration());

            imputation = imputationRepository.save(imputation);

            return new ImputationResponse(imputation);
        }else{
            throw new AlreadyBuiltException("The month report has already been generated, you can't change its imputations");
        }
    }

    public List<MonthReportResponse> getMonthReport(){
        List<MonthReportResponse> response = new ArrayList<>();
        UserDetailsImpl userDetails =
                (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        List<MonthReport> monthReports = monthReportService.getMonthReport(userDetails.getId());

        for(MonthReport monthReport:monthReports){
            response.add(new MonthReportResponse(monthReport));
        }
        return response;
    }
}
