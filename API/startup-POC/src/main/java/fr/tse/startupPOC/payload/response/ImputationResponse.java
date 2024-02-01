package fr.tse.startupPOC.payload.response;

import fr.tse.startupPOC.models.Imputation;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class ImputationResponse {
    private String userName;

    private Long projectId;

    private String projectName;

    private LocalDate date;

    private LocalTime duration;

    public ImputationResponse(Imputation imputation){
        this.userName = imputation.getUser().getFirstName() + " "+imputation.getUser().getLastName();
        this.projectId = imputation.getProject().getId();
        this.projectName = imputation.getProject().getProjectName();
        this.date = imputation.getDate();
        this.duration = imputation.getDuration();
    }
}
