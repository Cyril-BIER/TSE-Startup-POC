package fr.tse.startupPOC.repository;

import fr.tse.startupPOC.models.Imputation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImputationRepository extends JpaRepository<Imputation, Long> {
}