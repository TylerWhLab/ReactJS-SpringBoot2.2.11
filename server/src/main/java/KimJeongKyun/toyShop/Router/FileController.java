package KimJeongKyun.toyShop.Router;

import KimJeongKyun.toyShop.util.Cast;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.filechooser.FileSystemView;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@RestController
public class FileController {

    final static String rootPath = System.getProperty("user.dir").replace("\\", "/");
    // System.getProperty("user.dir") == C:\Study\SpringBoot\toy_shop\server

    final static String directory = "upload";


    @PostMapping("/api/file/up")
    public ResponseEntity<Object> fileUpload(@RequestPart("userfile") MultipartFile file, @RequestPart("subDir") String subDir) throws Exception {

        Map<String, Object> res = new HashMap<String, Object>();

        if (!file.isEmpty()) {

            String orgFileName = file.getOriginalFilename();
            String realFileName = orgFileName; /* TODO 가공필요 */

            // server\src\main\resources\static => 127.0.0.1/image.jpg url로 호출 시 저장 위치
            // 위치를 바꾸기 위해 fildDownURL API 만들었다.

            String dir = rootPath + "/" + directory + "/" + subDir;
            File d = new File(dir);
            if ( ! d.exists() ) {
                if ( d.mkdirs() ) { // 상위 디렉터리도 없으면 생성
                    System.out.println(dir + " 디렉터리 생성");
                }
            }

            String path = dir + "/" + realFileName;
            System.err.println("파일 업로드 경로");
            System.err.println(path);
            File dest = new File(path); // 한글은 HTML entity encoding, 영어는 정상 업로드
            file.transferTo(dest); // 파일 업로드 작업 수행

            res.put("success", true);
            res.put("orgFileName", orgFileName);
            res.put("realFileName", realFileName);
            res.put("path", subDir);

        } else {
            res.put("success", false);
            res.put("msg", "파일이 없습니다.");
            return new ResponseEntity(res, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity(res, HttpStatus.OK);
    }


    @PostMapping("/api/file/down")
    public ResponseEntity<Object> fildDown(@RequestBody Map req) throws IOException {

        Map<String, Object> res = new HashMap<String, Object>();
        String realFileName = Cast.STR(req.get("realFileName")); // 파일명
        String subDir = Cast.STR(req.get("path")); // subDir

        if (realFileName == null) {
            res.put("success", false);
            return new ResponseEntity(res, HttpStatus.BAD_REQUEST);
        }


        // Download Start
        // 파일명으로 다운로드, 간접 다운로드는 향후 구현
        String downloadPath = rootPath + "/" + directory + "/" + subDir + "/" + realFileName;
        System.err.println("downloadPath");
        System.err.println(downloadPath);
        Path targetFile = Paths.get(downloadPath);

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + targetFile.getFileName().toString());
        headers.add(HttpHeaders.CONTENT_TYPE, "application/octet-stream");


        try {
            Resource resource = new InputStreamResource(Files.newInputStream(targetFile));
            return new ResponseEntity(resource, headers, HttpStatus.OK);
        } catch (FileNotFoundException e) {
            res.put("success", false);
            res.put("msg", realFileName + " 파일을 찾을 수 없습니다.");
            return new ResponseEntity(res, HttpStatus.BAD_REQUEST);
        } catch (NoSuchFileException e) {
            res.put("success", false);
            res.put("msg", realFileName + " 파일이 존재하지 않습니다.");
            return new ResponseEntity(res, HttpStatus.BAD_REQUEST);
        } catch (Exception e ) {
            res.put("success", false);
            return new ResponseEntity(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }





    /* URL로 접근하여 이미지 뿌리기 전용 API */
    @GetMapping("/{fileName}")
    public ResponseEntity<Object> fildDownURL(@PathVariable String fileName) throws IOException {

        Map<String, Object> res = new HashMap<String, Object>();
        String realFileName = fileName;
        String subDir = "image";

        if (realFileName == null) {
            res.put("success", false);
            return new ResponseEntity(res, HttpStatus.BAD_REQUEST);
        }

        String downloadPath = rootPath + "/" + directory + "/" + subDir + "/" + realFileName;
        System.err.println("URL로 파일 다운로드 downloadPath");
        System.err.println(downloadPath);
        Path targetFile = Paths.get(downloadPath);

//        HttpHeaders headers = new HttpHeaders();
//        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + targetFile.getFileName().toString());
//        headers.add(HttpHeaders.CONTENT_TYPE, "application/octet-stream");

        try {
            Resource resource = new InputStreamResource(Files.newInputStream(targetFile));
//            return new ResponseEntity(resource, headers, HttpStatus.OK);
            return new ResponseEntity(resource, HttpStatus.OK);
        } catch (FileNotFoundException e) {
            res.put("success", false);
            res.put("msg", realFileName + " 파일을 찾을 수 없습니다.");
            return new ResponseEntity(res, HttpStatus.BAD_REQUEST);
        } catch (NoSuchFileException e) {
            res.put("success", false);
            res.put("msg", realFileName + " 파일이 존재하지 않습니다.");
            return new ResponseEntity(res, HttpStatus.BAD_REQUEST);
        } catch (Exception e ) {
            res.put("success", false);
            return new ResponseEntity(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }



}
