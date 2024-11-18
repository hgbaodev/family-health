package com.hgbaodev.backend.controller;

import com.hgbaodev.backend.dto.response.ApiResponse;
import com.hgbaodev.backend.model.Note;
import com.hgbaodev.backend.model.User;
import com.hgbaodev.backend.repository.NoteRepository;
import com.hgbaodev.backend.dto.request.note.UpdateNoteRequest;
import com.hgbaodev.backend.dto.request.note.AddNoteRequest;
import com.hgbaodev.backend.service.AuthenticationService;
import com.hgbaodev.backend.service.NoteService;
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
@RequestMapping("/api/v1/notes")
@RequiredArgsConstructor
@Slf4j
public class NoteController {
    private final AuthenticationService authenticationService;
    private final NoteService noteService;
    private final NoteRepository noteRepository;

    @PostMapping
    public ResponseEntity<ApiResponse<?>> addNote(@Valid @RequestBody AddNoteRequest addNoteRequest) {
        Note note = Note.builder()
                .userID(authenticationService.getCurrentUser().getId())
                .title(addNoteRequest.getTitle())
                .content(addNoteRequest.getContent())
                .createAt(addNoteRequest.getCreateAt())
                .noteIndex(addNoteRequest.getNoteIndex())
                .build();
        log.info(note.toString());
        Note createdNote = noteService.addNote(note);
        ApiResponse<Note> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                "Adding new note successfully",
                createdNote
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> updateNote(
            @PathVariable("id") Integer id,
            @Valid @RequestBody UpdateNoteRequest updateNoteRequest) {
        Note note = Note.builder()
                .noteID(id)
                .userID(authenticationService.getCurrentUser().getId())
                .title(updateNoteRequest.getTitle())
                .content(updateNoteRequest.getContent())
                .createAt(updateNoteRequest.getCreateAt())
                .noteIndex(updateNoteRequest.getNoteIndex())
                .build();
        Note updatedNote = noteService.updateNote(note);
        ApiResponse<Note> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                "Update note successfully",
                updatedNote
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable("id") Integer id) {
        noteService.deleteNote(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> getNoteById(@PathVariable("id") Integer id) {
        Optional<Note> note = noteService.getNoteById(id);
        ApiResponse<Optional<Note>> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                "Get note successfully",
                note
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Note>>> getAllNotes(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "8") int size,
            @RequestParam(defaultValue = "") String keyword) {
        User user = authenticationService.getCurrentUser();
        Page<Note> notesPage = noteService.getAllNotes(page, size, keyword, user.getId());
        List<Note> notes = notesPage.getContent();
        ApiResponse<List<Note>> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                "Get list of note successfully",
                notes
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
