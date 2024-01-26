package fr.tse.startupPOC.models;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
public class Admin extends Profile{
    public Admin(String email, String password){
        this.email = email;
        this.password = password;
    }
}
