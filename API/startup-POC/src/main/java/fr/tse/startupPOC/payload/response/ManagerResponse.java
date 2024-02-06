package fr.tse.startupPOC.payload.response;

import fr.tse.startupPOC.models.Manager;
import fr.tse.startupPOC.models.Project;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ManagerResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private List<ProjectInfo> projects = new ArrayList<>();

    public ManagerResponse(Manager manager){
        this.id = manager.getId();
        this.firstName = manager.getFirstName();
        this.lastName = manager.getLastName();
        this.email = manager.getEmail();
        for(Project project: manager.getProjects()){
            projects.add(new ProjectInfo(project.getId(),project.getProjectName()));
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    private static class ProjectInfo{
        private Long projectId;
        private String projectName;
    }
}
