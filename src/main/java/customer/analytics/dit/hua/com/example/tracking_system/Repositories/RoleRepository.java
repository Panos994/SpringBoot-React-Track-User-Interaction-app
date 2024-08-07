package customer.analytics.dit.hua.com.example.tracking_system.Repositories;

import customer.analytics.dit.hua.com.example.tracking_system.Entity.ROLE;
import customer.analytics.dit.hua.com.example.tracking_system.Entity.RoleName;
import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
@Hidden
public interface RoleRepository extends JpaRepository<ROLE, Long> {
        Optional<ROLE> findByName(RoleName roleName);

}

