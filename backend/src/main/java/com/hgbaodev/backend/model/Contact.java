package com.hgbaodev.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "contacts")
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name="contact_id")
    private int contactID;

    @Column(name = "user_id", nullable = false)
    private int userID;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "date", nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime date;

    @Column(name = "status", nullable = false)
    private boolean status;
}

