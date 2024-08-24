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
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

@RestController
@RequestMapping("/video")
@RequiredArgsConstructor
@Tag(name = "video", description = "video API")
public class VideoController {

    @PostMapping("/transcribe")
    public ResponseEntity<String> transcribeAudio(@RequestParam String youtubeUrl) {
        try {
            // Python 스크립트 경로와 인자 설정
            String pythonPath = "/usr/bin/python3"; // 시스템에 맞게 변경
            String pythonScriptPath = "src/main/resources/python/whisper_script.py";

            // ProcessBuilder를 통해 Python 스크립트를 실행
            ProcessBuilder processBuilder = new ProcessBuilder(pythonPath, pythonScriptPath, youtubeUrl);
            processBuilder.redirectErrorStream(true);
            Process process = processBuilder.start();

            // 비동기적으로 프로세스 출력 읽기
            Future<String> outputFuture = Executors.newSingleThreadExecutor().submit(() -> {
                BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
                StringBuilder output = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    output.append(line).append("\n");
                }
                return output.toString();
            });

            // 프로세스 종료 대기
            int exitCode = process.waitFor();
            if (exitCode != 0) {
                return ResponseEntity.status(500).body("Error occurred during Python script execution");
            }

            // STT 변환된 텍스트 반환
            String output = outputFuture.get(); // 비동기 출력 결과 대기
            return ResponseEntity.ok(output);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error occurred: " + e.getMessage());
        }
    }
}
