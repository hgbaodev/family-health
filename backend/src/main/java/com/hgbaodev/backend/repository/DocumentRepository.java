package com.hgbaodev.backend.repository;

import com.hgbaodev.backend.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<Document, Integer>{
}
