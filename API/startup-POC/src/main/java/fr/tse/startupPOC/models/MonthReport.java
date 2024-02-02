package fr.tse.startupPOC.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Duration;
import java.time.YearMonth;
import java.util.HashMap;
import java.util.Map;

@Entity
@Getter
@Setter
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"yearMonth", "user"}))
public class MonthReport {
    @Id
    @GeneratedValue
    private Long id;

    private YearMonth yearMonth;

    @ManyToOne
    private User user;

    @ElementCollection
    private Map<String, Duration> workTimeReport = new HashMap<>();


}
