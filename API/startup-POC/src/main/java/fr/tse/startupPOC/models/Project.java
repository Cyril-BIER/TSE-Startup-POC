package fr.tse.startupPOC.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    private String managerName;

    @ManyToMany (mappedBy = "project", cascade = CascadeType.ALL)
    private List<User> projectUsers;

    public Project(String projectName, String managerName, List<User> projectUsers){
        this.projectName = projectName;
        this.managerName = managerName;
        this.projectUsers = projectUsers;
    }

}
