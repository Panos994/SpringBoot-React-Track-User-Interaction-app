package customer.analytics.dit.hua.com.example.tracking_system.Service;


import customer.analytics.dit.hua.com.example.tracking_system.Entity.TrackingEvent;
import customer.analytics.dit.hua.com.example.tracking_system.Repositories.TrackingEventRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.List;

@Service
public class TrackingEventService {

    @Autowired
    private TrackingEventRepository trackingEventRepository;


/*
    public TrackingEvent saveEvent(TrackingEvent event) {
        // Validate or fetch the website if necessary
        if (event.getWebsite() != null && event.getWebsite().getId() != null) {
            Websites website = websiteRepository.findById(event.getWebsite().getId()).orElse(null);
            event.setWebsite(website);
        }
        return trackingEventRepository.save(event);
    }
*/
    public TrackingEvent saveEvent(TrackingEvent event) {
        // No need to fetch the website here if it's already validated in the controller
        return trackingEventRepository.save(event);
    }






    @Transactional
    public List<TrackingEvent> getEventsByType(String eventType) {
        return trackingEventRepository.findByEventType(eventType);
    }



    @Transactional
    public List<String> getDistinctEventTypes() {
        return trackingEventRepository.findDistinctEventTypes();
    }










}



