package customer.analytics.dit.hua.com.example.tracking_system.Service;
import customer.analytics.dit.hua.com.example.tracking_system.Entity.ROLE;
import customer.analytics.dit.hua.com.example.tracking_system.Entity.RoleName;
import customer.analytics.dit.hua.com.example.tracking_system.Repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.management.relation.Role;
import java.util.Optional;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public ROLE findByName(RoleName roleName) {
        Optional<ROLE> roleOptional = roleRepository.findByName(roleName);
        if (roleOptional.isPresent()) {
            return roleOptional.get();
        } else {
            throw new RuntimeException("Error: Role is not found.");
        }
    }
}

