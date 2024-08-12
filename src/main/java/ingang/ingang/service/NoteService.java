package ingang.ingang.service;

import ingang.ingang.domain.NoteEntity;
import ingang.ingang.dto.NoteRequestDto;
import ingang.ingang.dto.NoteResponseDto;
import ingang.ingang.repository.NoteRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class NoteService {

    private final NoteRepository noteRepository;

    //전체 노트 목록 조회
    public List<NoteResponseDto> noteList() {
        List<NoteEntity> showNote = noteRepository.findAll();
        List<NoteResponseDto> showNoteDto = new ArrayList<>();

        for(NoteEntity note : showNote) {
            NoteResponseDto noteResponseDto = new NoteResponseDto(note);
            showNoteDto.add(noteResponseDto);
        }
        return showNoteDto;
    }

    //학습 노트 열람
    public NoteResponseDto noteShow(long id) {
        NoteEntity note = noteRepository.findById(id).orElseThrow(
                ()-> new IllegalArgumentException("존재하지 않습니다."));
        return new NoteResponseDto(note);
    }

    //학습 노트 생성
    public NoteResponseDto create(NoteRequestDto requestDto){
        NoteEntity note = new NoteEntity(requestDto.getId(), requestDto.getTitle(), requestDto.getContents(), requestDto.getAuthor());
        noteRepository.save(note);

        return new NoteResponseDto(note);
    }

    //학습 노트 삭제
    public String noteDelete(NoteRequestDto requestDto) {
        String message = "delete success";
        NoteEntity note = noteRepository.findById(requestDto.getId()).orElseThrow(
                () -> new IllegalArgumentException("해당 노트가 없습니다."));

        noteRepository.deleteById(requestDto.getId());
        return message;
    }

    //학습 노트 편집
    public NoteResponseDto noteEdit(NoteRequestDto requestDto) {
        NoteEntity note = noteRepository.findById(requestDto.getId()).orElseThrow(
                () -> new IllegalArgumentException("해당 노트가 없습니다."));

        note.update(requestDto.getTitle(), requestDto.getContents());
        return new NoteResponseDto(note);
    }
}
