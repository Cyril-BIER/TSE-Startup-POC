package fr.tse.startupPOC.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class createProjectRequest {
    @NotBlank
    private String projectName;
    @NotBlank
    private String responsableName;
}
