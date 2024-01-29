package fr.tse.startupPOC.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Imputation {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JsonIgnore
    private User user;

    private LocalDate date;

    private Long duration;

    // TODO : Projet

    public Imputation(User user, LocalDate date, Long duration){
        this.user = user;
        this.date = date;
        this.duration = duration;
    }
}
