package fr.tse.startupPOC.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class User extends Profile{
    @ManyToOne
    private Manager manager;

    public User(String email, String firstName, String lastName,String password, Manager manager){
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.manager = manager;
    }

    @ManyToMany(cascade = CascadeType.DETACH)
    private List<Project> projects;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    List<Imputation> imputations;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    List<MonthReport> monthReports;

    public void addProject(Project project){
        this.projects.add(project);
    }

    public void addImputation(Imputation imputation){
        this.imputations.add(imputation);
    }

}
