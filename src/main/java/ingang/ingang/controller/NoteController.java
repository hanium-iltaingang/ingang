package ingang.ingang.controller;

import ingang.ingang.dto.NoteRequestDto;
import ingang.ingang.dto.NoteResponseDto;
import ingang.ingang.service.NoteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/note")
@RequiredArgsConstructor
@Tag(name = "note", description = "note API")
public class NoteController {

    private final NoteService noteService ;

    //노트 목록 조회
    @GetMapping
    @Operation(summary = "Get note List", description = "모든 노트들의 리스트를 확인할 수 있다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "성공",
                    content = {@Content(mediaType ="application/json",
                            array = @ArraySchema(schema = @Schema(implementation = NoteResponseDto.class)))}),
            @ApiResponse(responseCode = "404", description = "실패"),
    })
    public List<NoteResponseDto> GetnoteList() {
        return noteService.noteList();
    }

    //노트 내용 조회
    @GetMapping("{notesid}")
    @Operation(summary = "Get note contents", description = "노트의 내용을 조회할 수 있다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "성공",
                    content = {@Content(schema = @Schema(implementation = NoteResponseDto.class))}),
            @ApiResponse(responseCode = "404", description = "실패"),
    })
    public NoteResponseDto noteShow(@PathVariable Long noteid){
        return noteService.noteShow(noteid);
    }

    //노트 생성
    @PostMapping("{notesid}")
    @Operation(summary = "Create new note", description = "새로운 노트를 생성한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "성공",
                    content = {@Content(schema = @Schema(implementation = NoteResponseDto.class))}),
            @ApiResponse(responseCode = "404", description = "실패"),
    })
    public NoteResponseDto noteCreate(
            @PathVariable Long notesid,
            @RequestBody NoteRequestDto noteRequestDto
            ) {
        return noteService.create(noteRequestDto);
    }

    //노트 삭제
    @DeleteMapping("{notesid}")
    @Operation(summary = "Delete note", description = "기존에 존재하고 있던 노트를 삭제한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "성공",
                    content = {@Content(schema = @Schema(implementation = NoteResponseDto.class))}),
            @ApiResponse(responseCode = "404", description = "실패"),
    })
    public String noteDelete(
            @PathVariable Long notesid,
            @RequestBody NoteRequestDto noteRequestDto
    ) {
        return noteService.noteDelete(noteRequestDto);
    }

    //노트 편집
    @PatchMapping("{notesid}")
    @Operation(summary = "Edit note contents", description = "노트의 내용을 편집 수정한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "성공",
                    content = {@Content(schema = @Schema(implementation = NoteResponseDto.class))}),
            @ApiResponse(responseCode = "404", description = "실패"),
    })
    public NoteResponseDto noteEdit(
            @PathVariable Long notesid,
            @RequestBody NoteRequestDto noteRequestDto
    ) {
        return noteService.noteEdit(noteRequestDto);
    }
}
