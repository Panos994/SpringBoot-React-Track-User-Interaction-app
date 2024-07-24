package customer.analytics.dit.hua.com.example.tracking_system.Entity;

import lombok.Data;

import jakarta.persistence.*;
import java.util.Set;
import java.time.LocalDateTime;

@Entity
@Table(name = "websites")  // Adjust table name to avoid pluralization
@Data
public class Websites {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    private String url;
    private String name;  // New field for website name
    private String description;  // New field for website description
    private LocalDateTime createdDate;  // New field for the date the website was added





    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User owner;



    @OneToMany(mappedBy = "website")
    private Set<TrackingEvent> trackingEvents;
}