package com.hgbaodev.backend.service.impl;

import com.hgbaodev.backend.service.NoteService;
import com.hgbaodev.backend.repository.NoteRepository;
import com.hgbaodev.backend.model.Note;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class NoteServiceImpl implements NoteService {
    private final NoteRepository noteRepository;

    @Override
    public Note addNote(Note note) {
        return noteRepository.save(note);
    }

    @Override
    public Note updateNote(Note note) {
        Note check = noteRepository.findById(note.getNoteID())
                .orElseThrow(() -> new IllegalArgumentException("Note not found "));
        return noteRepository.save(note);
    }

    @Override
    public void deleteNote(Integer noteID){
        Note check = noteRepository.findById(noteID)
                .orElseThrow(() -> new IllegalArgumentException("Allergy not found"));
        noteRepository.deleteById(check.getNoteID());
    }

    @Override
    public Page<Note> getAllNotes(int page, int size, String keyword,Integer userID) {
        Pageable pageable = PageRequest.of(page - 1, size);
        if (keyword != null && !keyword.isEmpty()) {
            return noteRepository.findByKeyword(keyword, pageable,userID);
        }
        return noteRepository.getNotesByUserID(userID,pageable);
    }
    @Override
    public Optional<Note> getNoteById(Integer noteID){
        return noteRepository.findById(noteID);
    }
}
