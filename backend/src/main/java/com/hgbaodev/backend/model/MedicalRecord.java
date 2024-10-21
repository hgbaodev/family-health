package com.hgbaodev.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="medical_records")
public class MedicalRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="record_id")
    private int recordID;

//    @OneToMany(mappedBy = "medicalRecord")
//    private List<Document> documents;

    @Column(name = "member_id", nullable = false)
    private int memberID;

    @Column(name = "date")
    private LocalDate date;

    @Column(name="doctor")
    private String doctor;

    @Column(name="symptoms")
    private String symptoms;

    @Column(name="diagnosis")
    private String diagnosis;

    @Column(name="treatment")
    private String treatment;

    @Column(name="facility_name")
    private String facilityName;


}
