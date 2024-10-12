package ingang.ingang.dto;

import ingang.ingang.domain.NoteEntity;

public record NoteRequestDto(Long id, String title, String contents, String author) {

    public NoteEntity toEntity() {
        return NoteEntity.builder()
                .id(this.id())
                .title(this.title())
                .contents(this.contents())
                .author(this.author())
                .build();
    }
}
