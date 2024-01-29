package fr.tse.startupPOC.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class ImputationRequest {
    @NotNull
    private Long projectId;

    @NotBlank
    private LocalDate date;

    @NotNull
    private Long duration;
}
