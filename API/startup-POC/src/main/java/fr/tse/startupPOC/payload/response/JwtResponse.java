package fr.tse.startupPOC.payload.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String email;
    private List<String> roles;
    private boolean canAddImputation;

    public JwtResponse(String accessToken, Long id, String email, List<String> roles, boolean canAddImputation) {
        this.token = accessToken;
        this.id = id;
        this.email = email;
        this.roles = roles;
        this.canAddImputation = canAddImputation;
    }

}
