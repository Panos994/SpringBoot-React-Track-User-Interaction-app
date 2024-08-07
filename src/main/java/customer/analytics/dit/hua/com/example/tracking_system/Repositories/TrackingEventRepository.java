package customer.analytics.dit.hua.com.example.tracking_system.Repositories;

import customer.analytics.dit.hua.com.example.tracking_system.Entity.TrackingEvent;
import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.data.domain.Page;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
@Hidden
public interface TrackingEventRepository extends JpaRepository<TrackingEvent, Long> {
    List<TrackingEvent> findByWebsiteId(Long websiteId);


    @Query("SELECT DISTINCT e.eventType FROM TrackingEvent e")
    List<String> findDistinctEventTypes();

    List<TrackingEvent> findByEventType(String eventType);



}


