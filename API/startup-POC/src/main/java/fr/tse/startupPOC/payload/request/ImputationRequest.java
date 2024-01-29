package fr.tse.startupPOC.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ImputationRequest {
    @NotNull
    private Long projectId;

    @NotNull
   private LocalDate date;

    @NotNull
    private Long duration;
}
