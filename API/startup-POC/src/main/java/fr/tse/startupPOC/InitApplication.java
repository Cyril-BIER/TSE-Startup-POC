package fr.tse.startupPOC;

import fr.tse.startupPOC.payload.request.SignupAdminRequest;
import fr.tse.startupPOC.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class InitApplication implements ApplicationRunner {
    @Autowired
    AuthService authService;
    @Override
    public void run(ApplicationArguments args) throws Exception {
        try {
            SignupAdminRequest request = new SignupAdminRequest("root@root.com","rootpass");
            authService.createAdmin(request);
        }catch(Exception e){
            System.out.println("Root user already exists");
        }
    }
}
