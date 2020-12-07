package KimJeongKyun.toyShop.Router;

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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class FileController {

    @PostMapping("/api/file/up")
    public ResponseEntity<Object> fileUpload(@RequestPart("userfile") MultipartFile file) throws Exception {

        Map<String, Object> res = new HashMap<String, Object>();

        if (!file.isEmpty()) {
            // String rootPath = FileSystemView.getFileSystemView().getHomeDirectory().toString(); // C:\Users\rbswk\Desktop\
            // String filePath = "/" + file.getOriginalFilename();
            // basedir(== /): /file_upload # C:/file_upload/work/Tomcat/localhost/ROOT
            System.err.println("FileSystemView.getFileSystemView().toString()");
            System.err.println(FileSystemView.getFileSystemView().toString());

            String orgFileName = file.getOriginalFilename();
            String filePath = "C:/file_upload/work/spring/" + orgFileName; // 디렉터리는 생성되어 있어야 함
            File dest = new File(filePath); // 한글은 HTML entity encoding, 영어는 정상 업로드
            file.transferTo(dest); // 파일 업로드 작업 수행

            res.put("success", true);
            res.put("filePath", filePath);
            res.put("filename", orgFileName);
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

        System.err.println(req); // {filename=wifi_down.png}

        String rootPath = FileSystemView.getFileSystemView().getHomeDirectory().toString(); // C:\Users\tyler\Desktop

        //C:\Users\tyler\Documents
        String aPath = FileSystemView.getFileSystemView().getDefaultDirectory().getPath();
        System.err.println(aPath);
        String bPath = FileSystemView.getFileSystemView().getDefaultDirectory().getAbsolutePath();
        System.err.println(bPath);
        String cPath = FileSystemView.getFileSystemView().getDefaultDirectory().getCanonicalPath();
        System.err.println(cPath);

        String real_filename = req.get("filename").toString(); // 파일명

        if (real_filename == null) {
            res.put("success", false);
            return new ResponseEntity(res, HttpStatus.BAD_REQUEST);
        }


        // Download Start
        Path path = Paths.get("C:/file_upload/" + real_filename);

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + path.getFileName().toString());
        headers.add(HttpHeaders.CONTENT_TYPE, "application/octet-stream");

        try {
            Resource resource = new InputStreamResource(Files.newInputStream(path));
            return new ResponseEntity(resource, headers, HttpStatus.OK);
        } catch (FileNotFoundException e) {
            res.put("success", false);
            res.put("msg", real_filename + " 파일을 찾을 수 없습니다.");
            return new ResponseEntity(res, HttpStatus.BAD_REQUEST);
        } catch (NoSuchFileException e) {
            res.put("success", false);
            res.put("msg", real_filename + " 파일이 존재하지 않습니다.");
            return new ResponseEntity(res, HttpStatus.BAD_REQUEST);
        } catch (Exception e ) {
            res.put("success", false);
            return new ResponseEntity(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }



}
