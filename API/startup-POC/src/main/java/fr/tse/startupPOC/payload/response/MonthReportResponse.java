package fr.tse.startupPOC.payload.response;

import fr.tse.startupPOC.models.MonthReport;
import fr.tse.startupPOC.models.User;
import lombok.Getter;
import lombok.Setter;

import java.time.Duration;
import java.time.YearMonth;
import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
public class MonthReportResponse {
    private Long userId;
    private String userName;
    private YearMonth yearMonth;
    private Map<String, Duration> workTimeReport = new HashMap<>();

    public MonthReportResponse(MonthReport monthReport){
        User user = monthReport.getUser();
        this.userId = user.getId();
        this.userName = user.getFirstName()+" "+user.getLastName();
        this.yearMonth = monthReport.getYearMonth();
        this.workTimeReport = monthReport.getWorkTimeReport();
    }
}
