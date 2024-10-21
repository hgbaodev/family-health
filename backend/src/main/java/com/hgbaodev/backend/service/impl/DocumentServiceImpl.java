package com.hgbaodev.backend.service.impl;

import com.hgbaodev.backend.model.Document;
import com.hgbaodev.backend.repository.DocumentRepository;
import com.hgbaodev.backend.service.DocumentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class DocumentServiceImpl implements DocumentService {
    private final DocumentRepository documentRepository;

    @Override
    public Document addDocument(Document document) {
        return documentRepository.save(document);
    }

    @Override
    public Document updateDocument(Document document) {
        Document check = documentRepository.findById(document.getDocumentID())
                .orElseThrow(() -> new IllegalArgumentException("Document not found "));
        return documentRepository.save(document);
    }

    @Override
    public void deleteDocument(Integer documentID){
        Document check = documentRepository.findById(documentID)
                .orElseThrow(() -> new IllegalArgumentException("Document not found"));
        documentRepository.deleteById(check.getDocumentID());
    }

    @Override
    public Page<Document> getAllDocuments(int page, int size, String keyword,Integer userID) {
        Pageable pageable = PageRequest.of(page - 1, size);
        if (keyword != null && !keyword.isEmpty()) {
            return documentRepository.findByKeyword(keyword, pageable,userID);
        }
        return documentRepository.getAllBaseOnUserID(pageable,userID);
    }
    @Override
    public Optional<Document> findDocumentById(Integer documentID){
        return documentRepository.findById(documentID);
    }
}
