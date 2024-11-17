package com.hgbaodev.backend.repository;
import com.hgbaodev.backend.model.Note;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
public interface NoteRepository extends JpaRepository<Note, Integer> {
    @Query("SELECT n FROM Note n WHERE " +
            "LOWER(n.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(n.content) LIKE LOWER(CONCAT('%', :keyword, '%'))" +
            "AND n.userID in (SELECT u.id from User u where u.id = :userID)" +
            "ORDER BY n.noteIndex ASC"
    )
    Page<Note> findByKeyword(@Param("keyword") String keyword, Pageable pageable, Integer userID);

    @Query("SELECT n FROM Note n WHERE n.userID in " +
            "(SELECT u.id from User u where u.id = :userID)" +
            "ORDER BY n.noteIndex ASC"
    )
    Page<Note> getNotesByUserID(@Param("userID") Integer userID, Pageable pageable);
}
