package com.hgbaodev.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "vaccinations")
public class Vaccination {
    @Id
    @GeneratedValue
    private Integer vaccinationID;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(name = "vaccine_name", nullable = false)
    private String vaccineName;

    @Column(name = "date_administered", nullable = false)
    private Date dateAdministered;

}
