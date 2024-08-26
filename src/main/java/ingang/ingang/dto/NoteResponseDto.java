package ingang.ingang.dto;

import ingang.ingang.domain.NoteEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

public record NoteResponseDto (Long id, String title, String contents, String author,
                               LocalDateTime createdAt, LocalDateTime modifiedAt){

    public static NoteResponseDto from(NoteEntity entity) {
        return new NoteResponseDto(
                entity.getId(),
                entity.getTitle(),
                entity.getContents(),
                entity.getAuthor(),
                entity.getCreatedAt(),
                entity.getModifiedAt()
        );
    }
}
