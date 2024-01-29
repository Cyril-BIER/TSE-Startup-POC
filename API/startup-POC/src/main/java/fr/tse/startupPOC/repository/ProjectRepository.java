package fr.tse.startupPOC.repository;

import fr.tse.startupPOC.models.Manager;
import fr.tse.startupPOC.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
