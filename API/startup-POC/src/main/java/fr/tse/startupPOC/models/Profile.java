package fr.tse.startupPOC.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public abstract class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Email
    @Column(unique = true)
    private String email;

    @NotNull
    @Size(max = 120)
    @JsonIgnore
    private String password;
}
