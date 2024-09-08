package ingang.ingang.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Paths;
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
            // Python 스크립트 경로와 인자 설정 -> <만약에 안 된다면> 경로는 시스템에 따라 다를 수 있으니 맞춰서 변경해야함!!
            String pythonPath = "./videopython/bin/python3"; //pyhon이 들어있는 경로(저는 가상환경 생성해서 연결했습니다(깃에는 안 올린 폴더임))
            String pythonScriptPath = "./src/main/python/whisper_script.py"; //whisper_script.py이 들어있는 경로

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
                return output.toString().trim(); //자막 파일 경로 받아오기
            });

            // 프로세스 종료 대기
            int exitCode = process.waitFor();
            if (exitCode != 0) {
                return ResponseEntity.status(500).body("Error occurred during Python script execution");
            }

            // 파이썬 스크립트가 생성한 자막 텍스트 읽기
            String transcriptText = outputFuture.get().trim();

            // JSON 형식으로 응답 반환
            return ResponseEntity.ok("{\"transcription\":\"" + transcriptText + "\"}");


        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error occurred: " + e.getMessage());
        }
    }
}
