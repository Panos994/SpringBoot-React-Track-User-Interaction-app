package customer.analytics.dit.hua.com.example.tracking_system.Service;


import customer.analytics.dit.hua.com.example.tracking_system.Entity.User;
import customer.analytics.dit.hua.com.example.tracking_system.Repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }
}
