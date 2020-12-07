package KimJeongKyun.toyShop.Router;

import KimJeongKyun.toyShop.util.Cast;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@CrossOrigin // CORS 대응
public class NoticeController {

    @Autowired
    NoticeDao noticeDao;


    /* 공지 등록 */
    @PostMapping("/api/notice/insert")
    public ResponseEntity<Object> insertNotice(@RequestBody Map req) {
        Map<String, Object> res = new HashMap<String, Object>();
        Map<String, Object> writer = new HashMap<String, Object>();

        // 관리자만 작성
        writer = noticeDao.selectUser(req);
        if ( Cast.INT(writer.get("role")) == 0 ) {
            res.put("success", false);
            res.put("msg", "관리자가 아님");
            return new ResponseEntity(res, HttpStatus.BAD_REQUEST);
        }

        int i = noticeDao.insertFileInfo(req);
        if ( i == 0 ) {
            res.put("success", false);
            res.put("msg", "파일 저장 불가");
            return new ResponseEntity(res, HttpStatus.SERVICE_UNAVAILABLE);
        }

        i = 0;
        i = noticeDao.insertNotice(req);
        if ( i == 0 ) {
            res.put("success", false);
            res.put("msg", "공지 저장 불가");
            return new ResponseEntity(res, HttpStatus.SERVICE_UNAVAILABLE);
        }

        res.put("success", true);
        return new ResponseEntity(res, HttpStatus.OK);
    }


    /* 공지 전체 조회 + 상세 */
    @PostMapping("/api/notice")
    public ResponseEntity<Object> selectNotices(@RequestBody Map req) {
        Map<String, Object> res = new HashMap<String, Object>();
        List<Map<String, Object>> notices = new ArrayList<Map<String, Object>>();
        int noticeTotalCnt = 0;

        if ( !req.containsKey("searchText") ) req.put("searchText", "");
        if ( !req.containsKey("sortCol")    ) req.put("sortCol", "NOTICE_ID");
        if ( !req.containsKey("sortKeyword")) req.put("sortKeyword", "DESC");

        notices = noticeDao.selectNotices(req);
        noticeTotalCnt = noticeDao.selectNoticeTotal(req); // get total count

        res.put("success", true);
        res.put("notices", notices);
        res.put("noticeCnt", notices.size());
        res.put("noticeTotalCnt", noticeTotalCnt);

        return new ResponseEntity(res, HttpStatus.OK);
    }



}
