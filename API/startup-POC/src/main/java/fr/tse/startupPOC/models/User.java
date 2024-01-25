package fr.tse.startupPOC.models;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class User extends Profile{
    @ManyToOne
    private Manager manager;
}
