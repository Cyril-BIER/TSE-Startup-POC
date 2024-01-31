package fr.tse.startupPOC.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import fr.tse.startupPOC.models.Manager;

import java.util.List;

@Entity
@NoArgsConstructor
@Getter
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "project_name")
    private String projectName;

    @ManyToOne
    private Manager manager;

    @ManyToMany (mappedBy = "projects", cascade = CascadeType.ALL)
    private List<User> projectUsers;

    public Project(String projectName, Manager manager,List<User> projectUsers){
        this.projectName = projectName;
        this.manager = manager;
        this.projectUsers = projectUsers;
    }

}
