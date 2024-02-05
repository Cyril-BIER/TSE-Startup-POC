package fr.tse.startupPOC.models;

import jakarta.persistence.Entity;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
public class Admin extends Profile{
    public Admin(String email, String password){
        this.email = email;
        this.password = password;
    }

    public Admin(Long id, String firstName, String lastName, String email, String password){
        super(id, firstName, lastName, email, password);
    }
}
