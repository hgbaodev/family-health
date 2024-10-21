package com.hgbaodev.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="emergency_contacts")

public class EmergencyContact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int contactID;

    @Column(name = "user_id", nullable = false)
    private int userID;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "relationship" , nullable = false)
    private String relationship;

    @Column(name = "phone_number" , nullable = false)
    private String phoneNumber;


}