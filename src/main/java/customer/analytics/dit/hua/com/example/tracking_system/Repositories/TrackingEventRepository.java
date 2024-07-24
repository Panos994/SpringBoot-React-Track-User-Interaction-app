package customer.analytics.dit.hua.com.example.tracking_system.Repositories;

import customer.analytics.dit.hua.com.example.tracking_system.Entity.TrackingEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrackingEventRepository extends JpaRepository<TrackingEvent, Long> {
    List<TrackingEvent> findByWebsiteId(Long websiteId);
}
