package fr.tse.startupPOC.repository;

import fr.tse.startupPOC.models.Admin;
import fr.tse.startupPOC.models.Manager;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
}
