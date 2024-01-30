package fr.tse.startupPOC.payload.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import fr.tse.startupPOC.models.User;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class createProjectRequest {
    @NotBlank
    private String projectName;
    @NotBlank
    private String managerName;
    private List<User> projectUsers;
}
