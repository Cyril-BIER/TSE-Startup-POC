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
import java.time.LocalTime;

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

    private LocalTime duration;

    @ManyToOne
    private Project project;

    public Imputation(User user, Project project ,LocalDate date, LocalTime duration){
        this.user = user;
        this.project = project;
        this.date = date;
        this.duration = duration;
    }
}
