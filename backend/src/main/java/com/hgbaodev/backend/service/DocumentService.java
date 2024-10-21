package com.hgbaodev.backend.service;

import com.hgbaodev.backend.model.Document;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface DocumentService {
    //CRUD
    Document addDocument(Document document);
    Document updateDocument(Document document);
    void deleteDocument(Integer documentID);
    Page<Document> getAllDocuments(int page,int size, String keyword,Integer userID);
    //Search
    Optional<Document> findDocumentById(Integer documentID);
}
