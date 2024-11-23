package com.hgbaodev.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DocumentDTO {
    private int id;
    private String name;
    private int position;
    private String path;
    private String type;
    private Long size;
}
