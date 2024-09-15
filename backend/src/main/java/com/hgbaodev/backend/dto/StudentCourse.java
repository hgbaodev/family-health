package com.hgbaodev.backend.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class StudentCourse {
    private Long studentId;
    private Long courseId;
}
