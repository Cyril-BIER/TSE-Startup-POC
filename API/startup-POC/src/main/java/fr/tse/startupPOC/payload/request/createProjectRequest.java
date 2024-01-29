package fr.tse.startupPOC.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class createProjectRequest {
    @NotBlank
    private String projectName;
}
