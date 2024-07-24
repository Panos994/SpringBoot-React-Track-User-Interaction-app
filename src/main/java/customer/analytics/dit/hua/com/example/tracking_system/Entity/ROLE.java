package customer.analytics.dit.hua.com.example.tracking_system.Entity;

import lombok.Data;

import jakarta.persistence.*;

@Entity
@Data
public class ROLE {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Enumerated(EnumType.STRING)
    private RoleName name;

    public ROLE() {
    }

    public ROLE(RoleName name) {

        this.name = name;
    }
}

