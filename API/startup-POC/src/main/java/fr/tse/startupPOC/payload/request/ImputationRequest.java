package fr.tse.startupPOC.payload.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.Duration;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class ImputationRequest {
    @NotNull
    private Long projectId;

    @NotNull
    private LocalDate date;

    @NotNull
    private Duration duration;
}
