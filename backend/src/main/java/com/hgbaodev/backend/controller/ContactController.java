package com.hgbaodev.backend.controller;

import com.hgbaodev.backend.dto.response.ApiResponse;
import com.hgbaodev.backend.dto.response.ContactResponse;
import com.hgbaodev.backend.model.Contact;
import com.hgbaodev.backend.service.ContactService;
import com.hgbaodev.backend.utils.CustomPagination;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/contacts")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService service;

    @GetMapping
    public ResponseEntity<ApiResponse<CustomPagination<ContactResponse>>> getAllMembers(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "8") int size,
            @RequestParam(defaultValue = "") String keyword) {
        Page<ContactResponse> contactsPage = service.getAllContacts(page, size, keyword);

        CustomPagination<ContactResponse> contactsContent = new CustomPagination<>(contactsPage);

        ApiResponse<CustomPagination<ContactResponse>> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                "Get list contacts successfully",
                contactsContent
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> updateBlockState(
            @PathVariable("id") Integer id) {
        Contact updateContact = service.updateSeenStateUser(id);
        ApiResponse<Contact> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                "Update seen state of contacts successfully",
                updateContact
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/contacts-received-today")
    public ResponseEntity<ApiResponse<Long>> countContactsReceivedToday(){
        long count = service.countContactsReceivedToday();
        ApiResponse<Long> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                "Contacts received today: ",
                count
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
