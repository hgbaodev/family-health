package com.hgbaodev.backend.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

public interface CloudinaryService {
     Map<String, Object> uploadFile(MultipartFile file) throws IOException;

     Map<String, Object> deleteFile(String publicId) throws IOException;
}
