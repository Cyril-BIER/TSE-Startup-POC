package fr.tse.startupPOC.payload.response;

import fr.tse.startupPOC.models.Manager;
import fr.tse.startupPOC.models.Project;
import fr.tse.startupPOC.models.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ProjectResponse {
    private Long id;
    private String projectName;
    private Long managerId;
    private String managerName;
    private List<UserInfo> projectUsers = new ArrayList<>();

    public ProjectResponse(Project project){
        this.id = project.getId();
        this.projectName = project.getProjectName();
        Manager manager = project.getManager();
        this.managerId = manager.getId();
        this.managerName = manager.getFirstName() +" "+manager.getLastName();

        for(User user:project.getProjectUsers()){
            projectUsers.add(new UserInfo(user.getId(), user.getFirstName()+" "+user.getLastName()));
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    private static class UserInfo {
        private Long userId;
        private String fullName;
    }

}
