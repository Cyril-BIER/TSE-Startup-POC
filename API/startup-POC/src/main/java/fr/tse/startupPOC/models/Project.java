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

    private String responsableName;

    public Project(String projectName, String responsableName){
        this.projectName = projectName;
        this.responsableName = responsableName;
    }

}
