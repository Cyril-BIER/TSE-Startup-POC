package fr.tse.startupPOC.repository;

import fr.tse.startupPOC.models.MonthReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MonthReportRepository extends JpaRepository<MonthReport, Long> {
}