package com.hgbaodev.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hgbaodev.backend.model.Document;
import com.hgbaodev.backend.model.MedicalRecord;
import com.hgbaodev.backend.model.User;
import com.hgbaodev.backend.repository.MedicalRecordRepository;
import com.hgbaodev.backend.dto.request.document.UpdateDocumentRequest;
import com.hgbaodev.backend.dto.request.document.AddDocumentRequest;
import com.hgbaodev.backend.dto.response.ApiResponse;
import com.hgbaodev.backend.service.AuthenticationService;
import com.hgbaodev.backend.service.DocumentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/documents")
@RequiredArgsConstructor
@Slf4j
public class DocumentController {
    private final DocumentService documentService;
    private final AuthenticationService authenticationService;
    private final MedicalRecordRepository medicalRecordRepository;
    private final String BASE_DIRECTORY = "../documents";
    private final String BASE_URL = "/documents/download/";
    private User user;
    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping
    public ResponseEntity<ApiResponse<?>> addDocument(
            @Validated @RequestParam("file") MultipartFile file,
            @RequestParam("request") @Valid String json) {
        try {
            user = authenticationService.getCurrentUser();
            AddDocumentRequest addDocumentRequest = objectMapper.readValue(json, AddDocumentRequest.class);
            MedicalRecord medicalRecord = medicalRecordRepository.findById(addDocumentRequest.getRecordID())
                    .orElseThrow(() -> new RuntimeException("MedicalRecord not found"));
            String subFolder = user.getEmail();
            Path directoryPath = Paths.get(BASE_DIRECTORY, subFolder);
            if (!Files.exists(directoryPath)) {
                Files.createDirectories(directoryPath);
            }
            String fileName = file.getOriginalFilename();
            Path filePath = directoryPath.resolve(fileName);
            Files.write(filePath, file.getBytes());
            Document document = Document.builder()
                    .recordID(addDocumentRequest.getRecordID())
                    .fileName(addDocumentRequest.getFileName())
                    .fileType(addDocumentRequest.getFileType())
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
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(new ApiResponse<>(HttpStatus.BAD_REQUEST.value(),
                    "Invalid request JSON format: " + e.getMessage(), null), HttpStatus.BAD_REQUEST);
        } catch (IOException e) {
            return new ResponseEntity<>(new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    "File upload failed: " + e.getMessage(), null), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<ApiResponse<?>> updateDocument(
            @PathVariable("id") Integer id,
            @RequestPart("file") MultipartFile file,
            @RequestPart("request") @Valid String json) {
        try {
            user = authenticationService.getCurrentUser();
            UpdateDocumentRequest updateDocumentRequest = objectMapper.readValue(json, UpdateDocumentRequest.class);
            MedicalRecord medicalRecord = medicalRecordRepository.findById(updateDocumentRequest.getRecordID())
                    .orElseThrow(() -> new RuntimeException("MedicalRecord not found"));
            String subFolder = user.getEmail();
            Path directoryPath = Paths.get(BASE_DIRECTORY, subFolder);
            if (!Files.exists(directoryPath)) {
                Files.createDirectories(directoryPath);
            }
            String fileName = file.getOriginalFilename();
            Path filePath = directoryPath.resolve(fileName);
            Files.write(filePath, file.getBytes());
            Document document = Document.builder()
                    .documentID(id)
                    .recordID(updateDocumentRequest.getRecordID())
                    .fileName(updateDocumentRequest.getFileName())
                    .fileType(updateDocumentRequest.getFileType())
                    .uploadDate(updateDocumentRequest.getUploadDate())
                    .build();
            Document updatedDocument = documentService.updateDocument(document);
            ApiResponse<Document> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Update document successfully",
                    updatedDocument
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    "File update failed", null), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable("id") Integer id) {
        documentService.deleteDocument(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> getDocumentById(@PathVariable("id") Integer id) {
        Optional<Document> documentOptional = documentService.findDocumentById(id);
        user = authenticationService.getCurrentUser();
        if (documentOptional.isPresent()) {
            Document document = documentOptional.get();
            String subFolder = user.getEmail() + "/" + document.getFileName();
            String path = BASE_URL + subFolder;
            document.setPath(path);
            ApiResponse<Document> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Get document successfully",
                    document
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ApiResponse<>(HttpStatus.NOT_FOUND.value(), "Document not found", null), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Document>>> getAllDocuments(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "8") int size,
            @RequestParam(defaultValue = "") String keyword) {
        user = authenticationService.getCurrentUser();
        Page<Document> documentsPage = documentService.getAllDocuments(page, size, keyword, user.getId());
        List<Document> documents = documentsPage.getContent();
        String subFolder = user.getEmail();
        for (Document document : documents) {
            document.setPath(BASE_URL + subFolder + "/" + document.getFileName());
        }
        ApiResponse<List<Document>> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                "Get list of document successfully",
                documents
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping("/download/{userFolder}/{fileName}")
    public ResponseEntity<byte[]> downloadFile(
            @PathVariable String userFolder,
            @PathVariable String fileName) throws IOException {
        System.out.println(userFolder + "/" + fileName);
        Path filePath = Paths.get(BASE_DIRECTORY, userFolder, fileName).normalize();
        Resource resource = new UrlResource(filePath.toUri());

        if (resource.exists() && resource.isReadable()) {
            byte[] data = Files.readAllBytes(filePath); 
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(Files.probeContentType(filePath)))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(data);
        } else {
            throw new FileNotFoundException("File not found " + fileName);
        }
    }

}
