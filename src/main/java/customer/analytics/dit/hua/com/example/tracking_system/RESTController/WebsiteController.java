package customer.analytics.dit.hua.com.example.tracking_system.RESTController;


import customer.analytics.dit.hua.com.example.tracking_system.Entity.Websites;
import customer.analytics.dit.hua.com.example.tracking_system.Service.WebsiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/websites")
public class WebsiteController {

    @Autowired
    private WebsiteService websiteService;

    @PostMapping
    public Websites createWebsite(@RequestBody Websites website) {
        return websiteService.saveWebsite(website);
    }

    @GetMapping("/owner/{username}")
    public List<Websites> getWebsitesByOwner(@PathVariable String username) {
        return websiteService.findByOwnerUsername(username);
    }
}
