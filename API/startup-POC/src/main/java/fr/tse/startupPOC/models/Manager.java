package fr.tse.startupPOC.models;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class Manager extends Profile{
    @OneToMany(mappedBy = "manager")
    private List<User> attachedUsers;
}
