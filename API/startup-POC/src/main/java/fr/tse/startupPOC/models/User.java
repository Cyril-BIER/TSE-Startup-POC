package fr.tse.startupPOC.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
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

    public User(String email, String password, Manager manager, List<Project> project){
        this.email = email;
        this.password = password;
        this.manager = manager;
        this.project = project;
    }

    @ManyToMany
    @JsonIgnoreProperties(value = { "user" }, allowSetters = true)
    private List<Project> project;
}
