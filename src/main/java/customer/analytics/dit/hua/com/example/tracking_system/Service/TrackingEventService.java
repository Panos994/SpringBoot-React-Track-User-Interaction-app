package customer.analytics.dit.hua.com.example.tracking_system.Service;


import customer.analytics.dit.hua.com.example.tracking_system.Entity.TrackingEvent;
import customer.analytics.dit.hua.com.example.tracking_system.Entity.Websites;
import customer.analytics.dit.hua.com.example.tracking_system.Repositories.TrackingEventRepository;
import customer.analytics.dit.hua.com.example.tracking_system.Repositories.WebsiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrackingEventService {

    @Autowired
    private TrackingEventRepository trackingEventRepository;

    @Autowired
    private WebsiteRepository websiteRepository; // Optional if needed
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

    public List<TrackingEvent> getEventsByWebsiteId(Long websiteId) {
        return trackingEventRepository.findByWebsiteId(websiteId);
    }
}
