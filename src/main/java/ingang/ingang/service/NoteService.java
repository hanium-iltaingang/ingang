package ingang.ingang.service;

import ingang.ingang.domain.NoteEntity;
import ingang.ingang.dto.NoteRequestDto;
import ingang.ingang.dto.NoteResponseDto;
import ingang.ingang.repository.NoteRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class NoteService {

    private final NoteRepository noteRepository;

    //전체 노트 목록 조회
    public List<NoteResponseDto> noteList() {
        return noteRepository.findAll().stream()
                .map(NoteResponseDto::from).toList();
    }

    //학습 노트 열람
    public NoteResponseDto noteShow(long id) {
        NoteEntity note = noteRepository.findById(id).orElseThrow(
                ()-> new IllegalArgumentException("존재하지 않습니다."));
        return NoteResponseDto.from(note);
    }

    //학습 노트 생성
    public NoteResponseDto create(NoteRequestDto requestDto){
        NoteEntity note = requestDto.toEntity();
        NoteEntity savedNote = noteRepository.save(note);
        return NoteResponseDto.from(savedNote);
    }

    //학습 노트 삭제
    public String noteDelete(Long id) {
        NoteEntity note = noteRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 노트가 없습니다."));
        noteRepository.deleteById(id);
        return "삭제가 완료되었습니다.";
    }

    //학습 노트 편집
    public NoteResponseDto noteEdit(NoteRequestDto requestDto) {
        NoteEntity note = noteRepository.findById(requestDto.id()).orElseThrow(
                () -> new IllegalArgumentException("해당 노트가 없습니다."));

        note.update(requestDto.title(), requestDto.contents());
        return NoteResponseDto.from(note);
    }
}
