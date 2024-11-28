package com.hgbaodev.backend.dto.serializer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hgbaodev.backend.dto.response.DataMailDTO;
import org.apache.kafka.common.errors.SerializationException;
import org.apache.kafka.common.serialization.Serializer;

import java.util.Map;

public class DataMailDTOSerializer implements Serializer<DataMailDTO> {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void configure(Map<String, ?> configs, boolean isKey) {
        // No configuration needed
    }

    @Override
    public byte[] serialize(String topic, DataMailDTO data) {
        try {
            return objectMapper.writeValueAsBytes(data);
        } catch (Exception e) {
            throw new SerializationException("Error serializing DataMailDTO", e);
        }
    }

    @Override
    public void close() {
        // No resources to close
    }
}