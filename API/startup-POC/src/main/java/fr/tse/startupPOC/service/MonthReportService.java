package fr.tse.startupPOC.service;

import fr.tse.startupPOC.models.Imputation;
import fr.tse.startupPOC.models.MonthReport;
import fr.tse.startupPOC.models.User;
import fr.tse.startupPOC.repository.MonthReportRepository;
import fr.tse.startupPOC.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.AlreadyBuiltException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.HashMap;
import java.util.Optional;

@Service
public class MonthReportService {
    @Autowired
    MonthReportRepository monthReportRepository;
    @Autowired
    UserRepository userRepository;

    @Transactional
    public MonthReport generateReport(Long userId){
        Optional<User> oUser = userRepository.findById(userId);
        if(oUser.isEmpty()){
            throw new EntityNotFoundException("User with id "+userId+" doesn't exists.");
        }else{
            User user = oUser.get();
            if(!monthReportRepository.existsByYearMonthAndUser(YearMonth.now(),user)){
                MonthReport monthReport = new MonthReport();
                monthReport.setYearMonth(YearMonth.now());

                //TODO : add monthReport to the user
                monthReport.setUser(user);

                HashMap<String, Duration> workTimeReport = new HashMap<>();
                for(Imputation imputation: user.getImputations()){
                    String projectName = imputation.getProject().getProjectName();
                    if(! workTimeReport.containsKey(projectName)){
                        workTimeReport.put(projectName,imputation.getDuration());
                    }else{
                        Duration duration = workTimeReport.get(projectName);
                        workTimeReport.put(projectName,duration.plus(imputation.getDuration()));
                    }
                }
                monthReport.setWorkTimeReport(workTimeReport);

                return monthReportRepository.save(monthReport);

            }else{
                throw new AlreadyBuiltException("The month report for this user has already been generated");
            }
        }
    }
}
