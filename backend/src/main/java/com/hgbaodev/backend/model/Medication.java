package com.hgbaodev.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "members")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int memberID;

    @Column(name = "user_id", nullable = false)
    private int userID;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @Column(name = "gender")
    private String gender;

    @Column(name = "relationship")
    private String relationship;

    @Column(name = "blood_type")
    private String bloodType;

    @Column(name = "height")
    private float height;

    @Column(name = "weight")
    private float weight;

}
