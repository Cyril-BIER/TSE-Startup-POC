package fr.tse.startupPOC.models;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@NoArgsConstructor
@Getter
public class Manager extends Profile{
    @OneToMany(mappedBy = "manager")
    private List<User> attachedUsers;

    @OneToMany(mappedBy = "manager")
    List<Project> projects;

    public Manager(String email, String firstName, String lastName, String password){
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
    }

    public Manager(Long id, String firstName, String lastName, String email, String password){
        super(id, firstName, lastName, email, password);
    }
     public void addProject(Project project){
        this.projects.add(project);
     }

     public void addUser(User user){
        this.attachedUsers.add(user);
     }
}
