package customer.analytics.dit.hua.com.example.tracking_system.Repositories;

import customer.analytics.dit.hua.com.example.tracking_system.Entity.Websites;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WebsiteRepository extends JpaRepository<Websites, Long> {
    List<Websites> findByOwnerUsername(String username);
}
