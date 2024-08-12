package customer.analytics.dit.hua.com.example.tracking_system.RESTController;


import customer.analytics.dit.hua.com.example.tracking_system.Entity.TrackingEvent;
import customer.analytics.dit.hua.com.example.tracking_system.Entity.Websites;
import customer.analytics.dit.hua.com.example.tracking_system.Repositories.WebsiteRepository;
import customer.analytics.dit.hua.com.example.tracking_system.Service.TrackingEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;
import java.time.LocalDateTime;
import java.util.List;
@RestController
@RequestMapping("/api/tracking")
public class TrackingEventController {

    @Autowired
    private TrackingEventService trackingEventService;

    @Autowired
    private WebsiteRepository websiteRepository; // Optional if needed



    @PostMapping
    public ResponseEntity<TrackingEvent> createEvent(@RequestBody TrackingEvent event) {
        // Validate or fetch the website if necessary
        if (event.getWebsite() != null && event.getWebsite().getId() != null) {
            Websites website = websiteRepository.findById(event.getWebsite().getId()).orElse(null);
            if (website != null) {
                event.setWebsite(website);
            } else {
                return ResponseEntity.badRequest().body(null);
            }
        } else {
            event.setWebsite(null); // or handle as needed if the website is required
        }

        TrackingEvent savedEvent = trackingEventService.saveEvent(event);
        return ResponseEntity.ok(savedEvent);
    }











//ok
    @GetMapping("/event-types")
    public ResponseEntity<List<String>> getAllEventTypes() {
        List<String> eventTypes = trackingEventService.getDistinctEventTypes();
        return ResponseEntity.ok(eventTypes);
    }






    // New endpoint to get events by event type using a path variable
    //under construction
    @GetMapping("/{eventType}")
    public ResponseEntity<List<TrackingEvent>> getEventsByEventType(@PathVariable String eventType) {
        List<TrackingEvent> events = trackingEventService.getEventsByType(eventType);
        return ResponseEntity.ok(events);
    }











}