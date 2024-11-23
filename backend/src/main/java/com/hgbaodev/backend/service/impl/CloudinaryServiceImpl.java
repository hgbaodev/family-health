package com.hgbaodev.backend.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.hgbaodev.backend.service.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryServiceImpl implements CloudinaryService {
    private final Cloudinary cloudinary;

    @Override
    public String uploadFile(MultipartFile file) {
        try {
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            return uploadResult.get("url").toString();
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file");
        }

    }

    @Override
    public String uploadFile(String path) {
        try {
            Map uploadResult = cloudinary.uploader().upload(path, ObjectUtils.emptyMap());
            return uploadResult.get("url").toString();
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file" + e.getMessage());
        }
    }

    @Override
    public Map<String, Object> deleteFile(String publicId) throws IOException {
        return cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }
}
