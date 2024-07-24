package customer.analytics.dit.hua.com.example.tracking_system.Service;

import customer.analytics.dit.hua.com.example.tracking_system.Entity.Websites;
import customer.analytics.dit.hua.com.example.tracking_system.Repositories.WebsiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WebsiteService {

    @Autowired
    private WebsiteRepository websiteRepository;

    public List<Websites> findByOwnerUsername(String username) {
        return websiteRepository.findByOwnerUsername(username);
    }

    public Websites saveWebsite(Websites website) {
        return websiteRepository.save(website);
    }
}
