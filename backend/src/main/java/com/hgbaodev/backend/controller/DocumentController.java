package com.hgbaodev.backend.controller;

import com.hgbaodev.backend.model.Document;
import com.hgbaodev.backend.model.User;
import com.hgbaodev.backend.request.document.UpdateDocumentRequest;
import com.hgbaodev.backend.request.document.AddDocumentRequest;
import com.hgbaodev.backend.response.ApiResponse;
import com.hgbaodev.backend.service.AuthenticationService;
import com.hgbaodev.backend.service.DocumentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/documents")
@RequiredArgsConstructor
@Slf4j
public class DocumentController {
    private final DocumentService documentService;
    private final AuthenticationService authenticationService;

    @PostMapping

    public ResponseEntity<ApiResponse<?>> addDocument(@Valid @RequestBody AddDocumentRequest addDocumentRequest) {
        User user = authenticationService.getCurrentUser();
        Document document = Document.builder()
                .recordID(addDocumentRequest.getRecordID())
                .fileName(addDocumentRequest.getFileName())
                .fileType(addDocumentRequest.getFileType())
                .fileContent(addDocumentRequest.getFileContent())
                .uploadDate(addDocumentRequest.getUploadDate())
                .build();
        log.info(document.toString());
        Document createddocument = documentService.addDocument(document);
        ApiResponse<Document> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                "Adding new document successfully",
                createddocument
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> updateDocument(
            @PathVariable("id") Integer id,
            @Valid @RequestBody UpdateDocumentRequest updateDocumentRequest) {
        Document document = Document.builder()
                .documentID(id)
                .recordID(updateDocumentRequest.getRecordID())
                .fileName(updateDocumentRequest.getFileName())
                .fileType(updateDocumentRequest.getFileType())
                .fileContent(updateDocumentRequest.getFileContent())
                .uploadDate(updateDocumentRequest.getUploadDate())
                .build();
        Document updatedDocument = documentService.updateDocument(document);
        ApiResponse<Document> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                "Update document successfully",
                updatedDocument
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable("id") Integer id) {
        documentService.deleteDocument(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> getDocumentById(@PathVariable("id") Integer id) {
        Optional<Document> document = documentService.findDocumentById(id);
        ApiResponse<Optional<Document>> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                "Get document successfully",
                document
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping
        public ResponseEntity<ApiResponse<List<Document>>> getAllDocuments(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "8") int size,
            @RequestParam(defaultValue = "") String keyword) {
        Page<Document> documentsPage = documentService.getAllDocuments(page,size,keyword);
        List<Document> documents = documentsPage.getContent();
        ApiResponse<List<Document>> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                "Get list of document successfully",
                documents
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
