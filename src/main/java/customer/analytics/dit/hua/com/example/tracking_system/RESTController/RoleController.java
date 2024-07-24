package customer.analytics.dit.hua.com.example.tracking_system.RESTController;


import customer.analytics.dit.hua.com.example.tracking_system.Entity.ROLE;
import customer.analytics.dit.hua.com.example.tracking_system.Entity.RoleName;
import customer.analytics.dit.hua.com.example.tracking_system.Service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping("/{name}")
    public ROLE getRole(@PathVariable RoleName name) {
        return roleService.findByName(name);
    }
}
