package fr.tse.startupPOC.models;

import jakarta.persistence.Entity;
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

    public User(String email, String password, Manager manager){
        this.email = email;
        this.password = password;
        this.manager = manager;
    }
}
