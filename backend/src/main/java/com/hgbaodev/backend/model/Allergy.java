    package com.hgbaodev.backend.model;

    import jakarta.persistence.*;
    import lombok.*;


    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Entity
    @Table(name="allergies")
    public class Allergy {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int id;

        @ManyToOne(fetch = FetchType.LAZY, optional = false)
        @JoinColumn(name = "member_id", nullable = false)
        private Member member;

        @Column(name="allergy_type")
        private String allergyType;

        @Column(name="severity")
        private String severity;

        @Column(name="symptoms")
        private String symptoms;
    }
