package ingang.ingang;

import ingang.ingang.domain.NoteEntity;
import ingang.ingang.dto.NoteRequestDto;
import ingang.ingang.dto.NoteResponseDto;
import ingang.ingang.repository.NoteRepository;
import ingang.ingang.service.NoteService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class NoteServiceTest {

    @Autowired
    private NoteService noteService;

    @Autowired
    private NoteRepository noteRepository;

    @BeforeEach
    void setUp() {
        NoteEntity note1 = NoteEntity.builder()
                .id(1L)
                .title("Title 1")
                .contents("content 1")
                .author("author 1")
                .build();

        NoteEntity note2 = NoteEntity.builder()
                .id(2L)
                .title("Title 2")
                .contents("content 2")
                .author("author 2")
                .build();

        noteRepository.save(note1);
        noteRepository.save(note2);
    }

    //전체 노트 목록 조회
    @Test
    void NoteList() {
        //given -> setUp()

        //when
        List<NoteResponseDto> noteResponseDtos = noteService.noteList();

        //then
        assertThat(noteResponseDtos.size()).isEqualTo(2);
        assertThat(noteResponseDtos.get(0).getTitle()).isEqualTo("Title 1");
        assertThat(noteResponseDtos.get(1).getTitle()).isEqualTo("Title 2");

    }

    //노트 내용 조회
    @Test
    void NoteShow() {
        //given
        NoteEntity note = noteRepository.findAll().get(0);
        Long noteId = note.getId();

        //when
        NoteResponseDto noteResponse = noteService.noteShow(noteId);

        //then
        assertThat(noteResponse.getId()).isEqualTo(noteId);
        assertThat(noteResponse.getTitle()).isEqualTo("Title 1");
    }

    //노트 생성
    @Test
    void NoteCreate() {
        //given
        NoteRequestDto requestDto = NoteRequestDto.builder()
                .title("New Title")
                .contents("New Content")
                .author("New Author")
                .build();

        //when
        NoteResponseDto createdNote = noteService.create(requestDto);

        //then
        assertThat(createdNote.getTitle()).isEqualTo("New Title");
        assertThat(createdNote.getContents()).isEqualTo("New Content");
        assertThat(noteRepository.findById(createdNote.getId()).isPresent()).isTrue();
    }

    //노트 삭제
    @Test
    void NoteDelete() {
        //given
        NoteEntity note = noteRepository.findAll().get(0);
        Long noteId = note.getId();
        NoteRequestDto requestDto = NoteRequestDto.builder()
                .id(noteId)
                .build();

        //when
        String message = noteService.noteDelete(requestDto);

        //then
        assertThat(message).isEqualTo("delete success");
        assertThat(noteRepository.findById(noteId).isPresent()).isFalse();
    }

    //노트 편집
    @Test
    void NoteEdit() {
        //given
        NoteEntity note = noteRepository.findAll().get(0);
        Long noteId = note.getId();
        NoteRequestDto requestDto = NoteRequestDto.builder()
                .id(noteId)
                .title("Updated Title")
                .contents("Updated Content")
                .build();

        //when
        NoteResponseDto updatedNote = noteService.noteEdit(requestDto);

        //then
        assertThat(updatedNote.getTitle()).isEqualTo("Updated Title");
        assertThat(updatedNote.getContents()).isEqualTo("Updated Content");
    }

}
