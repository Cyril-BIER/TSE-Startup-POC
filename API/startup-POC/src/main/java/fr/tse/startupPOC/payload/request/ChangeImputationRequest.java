package fr.tse.startupPOC.payload.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.Duration;

@Getter
@Setter
public class ChangeImputationRequest {
    @NotNull
    private Long imputationId;
    @NotNull
    private Duration duration;
}
