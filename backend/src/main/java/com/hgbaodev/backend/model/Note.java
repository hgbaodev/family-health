package com.hgbaodev.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="notes")
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int noteID;

    @Column(name = "user_id", nullable = false)
    private int userID;

    @Column(name="title")
    private String title;

    @Column(name="content")
    private String content;

    @Column(name = "create_at")
    private LocalDate createAt;

    @Column(name="note_index")
    private int noteIndex;
}
