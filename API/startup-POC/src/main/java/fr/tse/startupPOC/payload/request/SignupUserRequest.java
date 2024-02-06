package fr.tse.startupPOC.payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class SignupUserRequest {
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    private String firstName;

    private String lastName;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

    private List<Long> projects = new ArrayList<>();


}
