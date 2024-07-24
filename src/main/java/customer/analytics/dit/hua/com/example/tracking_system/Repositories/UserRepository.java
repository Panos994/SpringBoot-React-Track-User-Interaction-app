package customer.analytics.dit.hua.com.example.tracking_system.Repositories;

import customer.analytics.dit.hua.com.example.tracking_system.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);


    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}
