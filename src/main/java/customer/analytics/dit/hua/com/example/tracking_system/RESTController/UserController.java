package customer.analytics.dit.hua.com.example.tracking_system.RESTController;


import customer.analytics.dit.hua.com.example.tracking_system.Entity.User;
import customer.analytics.dit.hua.com.example.tracking_system.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @GetMapping("/{username}")
    public User getUser(@PathVariable String username) {
        return userService.findByUsername(username).orElse(null);
    }
}

