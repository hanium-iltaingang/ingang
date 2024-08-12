package ingang.ingang.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class NoteRequestDto {

    private Long id;
    private String title;
    private String contents;
    private String author;

    @Builder

    public NoteRequestDto(Long id, String title,
                          String contents, String author) {
        this.id = id;
        this.title = title;
        this.contents = contents;
        this.author = author;
    }
}
