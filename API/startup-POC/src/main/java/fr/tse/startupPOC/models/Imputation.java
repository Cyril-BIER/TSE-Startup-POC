package fr.tse.startupPOC.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Duration;
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
    private User user;

    private LocalDate date;

    private Duration duration;

    @ManyToOne
    private Project project;

    public Imputation(User user, Project project ,LocalDate date, Duration duration){
        this.user = user;
        this.project = project;
        this.date = date;
        this.duration = duration;
    }
}
