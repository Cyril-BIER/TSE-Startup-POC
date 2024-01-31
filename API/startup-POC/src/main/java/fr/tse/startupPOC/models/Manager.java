package fr.tse.startupPOC.models;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@NoArgsConstructor
@Getter
public class Manager extends Profile{
    @OneToMany(mappedBy = "manager")
    private List<User> attachedUsers;

    @OneToMany(mappedBy = "manager")
    List<Project> projects;

    public Manager(String email, String password){
        this.email = email;
        this.password = password;
    }
     public void addProject(Project project){
        this.projects.add(project);
     }

     public void addUser(User user){
        this.attachedUsers.add(user);
     }
}
