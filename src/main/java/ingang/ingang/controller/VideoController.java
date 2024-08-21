package ingang.ingang.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.InputStreamReader;

@RestController
@RequestMapping("/video")
@RequiredArgsConstructor
@Tag(name = "video", description = "video API")
public class VideoController {

    @PostMapping("/transcribe")
    public ResponseEntity<String> transcribeAudio(@RequestParam String youtubeUrl) {
        try {
            // Python 스크립트 경로와 인자 설정
            String pythonScriptPath = "src/main/resources/python/whisper_script.py";
            ProcessBuilder processBuilder = new ProcessBuilder("python3", pythonScriptPath, youtubeUrl);
            Process process = processBuilder.start();

            // Python 스크립트 출력 읽기
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            StringBuilder output = new StringBuilder();

            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }

            // 프로세스 종료 대기
            process.waitFor();

            // STT 변환된 텍스트 반환
            return ResponseEntity.ok(output.toString());

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error occurred");
        }
    }
}
