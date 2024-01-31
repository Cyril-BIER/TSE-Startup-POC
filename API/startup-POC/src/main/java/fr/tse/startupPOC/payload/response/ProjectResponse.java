package fr.tse.startupPOC.payload.response;

import fr.tse.startupPOC.models.Manager;
import fr.tse.startupPOC.models.Project;
import fr.tse.startupPOC.models.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
public class ProjectResponse {
    private Long id;
    private String projectName;
    private Long managerId;
    private String managerName;
    private Map<Long, String> projectUsers = new HashMap<>();

    public ProjectResponse(Project project){
        this.id = project.getId();
        this.projectName = project.getProjectName();
        Manager manager = project.getManager();
        this.managerId = manager.getId();
        this.managerName = manager.getFirstName() +" "+manager.getLastName();

        for(User user:project.getProjectUsers()){
            projectUsers.put(user.getId(), user.getFirstName()+" "+ user.getLastName());
        }
    }

}
