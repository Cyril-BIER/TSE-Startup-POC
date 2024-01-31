package fr.tse.startupPOC.payload.response;

import fr.tse.startupPOC.models.Manager;
import fr.tse.startupPOC.models.Project;
import fr.tse.startupPOC.models.User;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
public class UserResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private Long managerId;
    private String managerName;
    private Map<Long, String> projects = new HashMap<>();

    public UserResponse(User user){
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        Manager manager = user.getManager();
        this.managerId = manager.getId();
        this.managerName = manager.getFirstName() + " "+manager.getLastName();
        if(user.getProjects() != null){
            for(Project project : user.getProjects()){
                projects.put(project.getId(),project.getProjectName());
            }
        }

    }
}
