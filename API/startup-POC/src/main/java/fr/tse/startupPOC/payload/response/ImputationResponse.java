package fr.tse.startupPOC.payload.response;

import fr.tse.startupPOC.models.Imputation;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImputationResponse {
    private String userName;

    private String projectName;

    private Float duration;

    public ImputationResponse(Imputation imputation){
        this.userName = imputation.getUser().getFirstName() + " "+imputation.getUser().getLastName();
        this.projectName = imputation.getProject().getProjectName();
        this.duration = imputation.getDuration();
    }
}
