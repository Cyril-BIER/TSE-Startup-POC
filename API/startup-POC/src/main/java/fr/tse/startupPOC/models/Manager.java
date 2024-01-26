package fr.tse.startupPOC.models;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@NoArgsConstructor
public class Manager extends Profile{
    @OneToMany(mappedBy = "manager")
    private List<User> attachedUsers;

    public Manager(String email, String password){
        this.email = email;
        this.password = password;
    }
}
