package customer.analytics.dit.hua.com.example.tracking_system.Repositories;

import customer.analytics.dit.hua.com.example.tracking_system.Entity.ROLE;
import customer.analytics.dit.hua.com.example.tracking_system.Entity.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<ROLE, Long> {
        Optional<ROLE> findByName(RoleName roleName);

}

