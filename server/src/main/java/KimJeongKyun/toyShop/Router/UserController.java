package KimJeongKyun.toyShop.Router;

import KimJeongKyun.toyShop.util.Md5;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.math.BigDecimal;
import java.util.*;


@RestController
@CrossOrigin // CORS 대응
public class UserController {

    @Autowired
    UserDao userDao;

    final static String session_name = "s_auth";


    @GetMapping("/api/users/auth")
    public ResponseEntity<Object> auth(HttpServletRequest request) {

        Map<String, Object> res = new HashMap<String, Object>();
        Map<String, Object> sess = new HashMap<String, Object>();
        Map<String, Object> user = new HashMap<String, Object>();
//        List<Map> cart = new ArrayList<Map>();
        HttpSession session = request.getSession();

        if ( (String)session.getAttribute(session_name) == null ) {
            System.err.println("세션 없음");
            res.put("isAuth", false);
            res.put("msg", "no session");
            return new ResponseEntity(res, HttpStatus.UNAUTHORIZED);
        }

        sess.put("s_auth", (String)session.getAttribute(session_name));
        user = userDao.selectUserSession(sess);
        sess.put("user_id", user.get("USER_ID"));

        int timeover = ((BigDecimal) user.get("TIME_OVER")).intValue(); // KEY 값은 BigDecimal 이라 변환 후 intValue로 또 변환
        if ( timeover == 1 ) {
            // 세션 삭제
            int d = userDao.deleteSession(sess);
            System.err.println("delete 결과 : " + d); // delete record count

            session.invalidate(); // 세션 파기 // 이후론 getAttribute 아예 불가
            res.put("isAuth", false);
        } else {
            List<Map<String, Object>> cart = userDao.selectCart( sess );
            res = user;
            res.put("cart", cart);
            res.put("isAdmin", user.get("ROLE").equals(0) ? false : true);
        }

        return new ResponseEntity(res, HttpStatus.OK);
    }


    @PostMapping("/api/users/login")
    public ResponseEntity<Object> login(HttpServletRequest request, @RequestBody Map req) { // @RequestBody Map req

        Map<String, Object> res = new HashMap<String, Object>();
        Map<String, Object> user = new HashMap<String, Object>();
        Map<String, Object> sess = new HashMap<String, Object>();
        HttpSession session = request.getSession();
        String salt = "LOGIN_SESSION_CREATE";
        Date date = new Date();

        String reqEmail = req.get("email").toString();
        String reqPassword = req.get("password").toString();

        user = userDao.selectUserForLogin(req);

        if ( user.get("EMAIL").equals(reqEmail) && user.get("PASSWORD").equals(reqPassword) ) {
            /* 로그인 성공 시 세션 생성 */
            String s_auth = Md5.createMD5(reqEmail + salt + reqPassword + date.toString());
            session.setAttribute(session_name, s_auth);

            sess.put("user_id", user.get("USER_ID"));
            sess.put("s_auth", s_auth);
            sess.put("session_exp", 30); // 30분 후 session 파기

            int i = userDao.insertSession(sess); // SESSION INSERT
            System.err.println("insert 결과 : " + i);

            res.put("loginSuccess", true);
            res.put("session", (String)session.getAttribute(session_name));
        } else {
            res.put("loginSuccess", false);
        }

        return new ResponseEntity(res, HttpStatus.OK);
    }





}