package fr.tse.startupPOC.repository;

import fr.tse.startupPOC.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}