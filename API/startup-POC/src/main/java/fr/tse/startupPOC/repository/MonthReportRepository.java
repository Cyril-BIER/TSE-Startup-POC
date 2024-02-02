package fr.tse.startupPOC.repository;

import fr.tse.startupPOC.models.MonthReport;
import fr.tse.startupPOC.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.YearMonth;

public interface MonthReportRepository extends JpaRepository<MonthReport, Long> {
    boolean existsByYearMonthAndUser(YearMonth yearMonth, User user);
}