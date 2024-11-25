package com.hgbaodev.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name="medical_records")
public class MedicalRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

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

    @Column(name="deleted_at", nullable = true)
    private LocalDate deletedAt;

    @OneToMany(mappedBy = "medicalRecord", fetch = FetchType.LAZY)
    private List<Medication> medications;

    @OneToMany(mappedBy = "medicalRecord", fetch = FetchType.LAZY)
    private List<Document> documents;

    public void delete() {
        this.deletedAt = LocalDate.now();
    }

}