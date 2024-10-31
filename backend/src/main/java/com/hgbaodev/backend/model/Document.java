package com.hgbaodev.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "documents")
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="document_id")
    private int documentID;

    @Column(name="record_id")
    private int recordID;

    @Column(name = "file_name", nullable = false)
    private String fileName;

    @Column(name = "file_type",nullable = false)
    private String fileType;

    @Column(name = "upload_date")
    private LocalDate uploadDate;

    @Transient  // Không lưu thuộc tính này vào cơ sở dữ liệu
    private String path;
}
