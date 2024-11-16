package com.hgbaodev.backend.utils;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
public class CustomPagination<T> {
    List<T> items;
    CustomPageMeta meta;

    public CustomPagination(Page<T> page) {
        this.items = page.getContent();
        this.meta = new CustomPageMeta(
                page.getNumber() + 1,
                page.getPageable().getPageSize(),
                page.getTotalPages(),
                page.getTotalElements()
        );
    }

    @Data
    @AllArgsConstructor
    static class CustomPageMeta {
        @JsonProperty("current_page")
        int currentPage;

        @JsonProperty("per_page")
        int perPage;

        @JsonProperty("total_pages")
        int totalPages;

        @JsonProperty("total_elements")
        long totalElements;
    }
}
