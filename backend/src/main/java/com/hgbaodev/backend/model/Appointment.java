package com.hgbaodev.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int appointmentID;

    @Column(name = "member_id", nullable = false)
    private int memberID;

    @Column(name = "time", nullable = false)
    private LocalTime time;

    @Column(name = "doctor")
    private String doctor;

    @Column(name = "location")
    private String location;
}
