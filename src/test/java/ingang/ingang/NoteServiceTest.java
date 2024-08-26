package ingang.ingang;

import ingang.ingang.domain.NoteEntity;
import ingang.ingang.dto.NoteRequestDto;
import ingang.ingang.dto.NoteResponseDto;
import ingang.ingang.repository.NoteRepository;
import ingang.ingang.service.NoteService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class NoteServiceTest {

    @Mock
    private NoteRepository noteRepository;

    @InjectMocks
    private NoteService noteService;

    private NoteEntity note1;
    private NoteEntity note2;

    @BeforeEach
    void setUp() {
        note1 = createNote(1L, "Title 1", "Content 1", "author 1");
        note2 = createNote(2L, "Title 2", "Content 2", "author 2");
    }

    private NoteEntity createNote(Long id, String title, String contents, String author){
        return NoteEntity.builder()
                .id(id)
                .title(title)
                .contents(contents)
                .author(author)
                .build();
    }

    //전체 노트 목록 조회
    @Test
    void NoteList() {
        //given
        List<NoteEntity> notes = List.of(note1, note2);

        //when
        when(noteRepository.findAll()).thenReturn(notes);
        List<NoteResponseDto> responses = noteService.noteList();

        //then
        assertThat(responses.size()).isEqualTo(2);
        assertThat(responses.get(0).title()).isEqualTo("Title 1");
        assertThat(responses.get(1).title()).isEqualTo("Title 2");

    }

    //노트 내용 조회
    @Test
    void NoteShow() {
        //given
    when(noteRepository.findById(1L)).thenReturn(Optional.of(note1));

        //when
        NoteResponseDto noteResponse = noteService.noteShow(1L);

        //then
        assertThat(noteResponse.id()).isEqualTo(1L);
        assertThat(noteResponse.title()).isEqualTo("Title 1");
    }

    //노트 생성
    @Test
    void NoteCreate() {
        //given
        NoteRequestDto requestDto = new NoteRequestDto(null, "New Title", "New Content", "New Author");
        NoteEntity noteToSave = requestDto.toEntity();
        NoteEntity savedNote = NoteEntity.builder()
                .id(3L)
                .title("New Title")
                .contents("New Content")
                .author("New Author")
                .build();

        when(noteRepository.save(any(NoteEntity.class))).thenReturn(savedNote);

        //when
        NoteResponseDto createdNote = noteService.create(requestDto);

        //then
        assertThat(createdNote).isNotNull();
        assertThat(createdNote.title()).isEqualTo("New Title");
        assertThat(createdNote.contents()).isEqualTo("New Content");
        assertThat(createdNote.id()).isEqualTo(3L);
    }

    //노트 삭제
    @Test
    void NoteDelete() {
        //given
        when(noteRepository.findById(1L)).thenReturn(Optional.of(note1));
        doNothing().when(noteRepository).deleteById(1L);

        //when
        String message = noteService.noteDelete(1L);

        //then
        assertThat(message).isEqualTo("삭제가 완료되었습니다.");
        verify(noteRepository).deleteById(1L);
    }

    //노트 편집
    @Test
    void NoteEdit() {
        //given
        NoteRequestDto requestDto = new NoteRequestDto(1L, "Updated Title", "Updated Content", null);
        when(noteRepository.findById(1L)).thenReturn(Optional.of(note1));

        //when
        NoteResponseDto updatedNote = noteService.noteEdit(requestDto);

        //then
        assertThat(updatedNote.title()).isEqualTo("Updated Title");
        assertThat(updatedNote.contents()).isEqualTo("Updated Content");
    }

}
