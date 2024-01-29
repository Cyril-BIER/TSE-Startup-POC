package fr.tse.startupPOC.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class User extends Profile{
    @ManyToOne
    private Manager manager;

    public User(String email, String password, Manager manager, Project project){
        this.email = email;
        this.password = password;
        this.manager = manager;
        this.project = project;
    }

    @ManyToOne
    @JoinColumn(name = "project_id")
    @JsonIgnoreProperties(value = { "user" }, allowSetters = true)
    private Project project;
}
