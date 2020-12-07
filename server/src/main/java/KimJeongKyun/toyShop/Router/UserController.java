package KimJeongKyun.toyShop.Router;

import KimJeongKyun.toyShop.util.Cast;
import KimJeongKyun.toyShop.util.Md5;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.*;


@RestController
@CrossOrigin // CORS 대응
public class UserController {

    @Autowired
    UserDao userDao;

    final static String session_name = "sAuth";
    final static String userPwSalt = "hashed";


    public Map<String, Object> auth(HttpSession session) {
        Map<String, Object> res = new HashMap<String, Object>();
        Map<String, Object> sess = new HashMap<String, Object>();
        Map<String, Object> user = new HashMap<String, Object>();

        String sessionValue = Cast.STR(session.getAttribute(session_name)).toLowerCase().trim();

        if ( sessionValue.equals("null") || sessionValue.equals("") ) {
            System.err.println("세션 없음");
            res.put("isAuth", false);
            return res;
        }

        sess.put(session_name, sessionValue);
        user = userDao.selectUserSession(sess);
        if ( user == null ) {
            System.err.println("인증 실패, userDao.selectUserSession is null");
            res.put("isAuth", false);
        }

        String timeOver = Cast.STR(user.get("timeOver")); // KEY 값은 BigDecimal 이라 변환 후 intValue로 또 변환
        if ( timeOver.equals("Y") ) {
            // 세션 삭제
            int d = userDao.deleteSession( user );
            System.err.println("deleteSession 결과 : " + d); // delete record count

            session.invalidate(); // 세션 파기 // 이후론 getAttribute 아예 불가
            res.put("isAuth", false);
        } else {
            res = user;
            res.put("isAuth", true);
            res.put("isAdmin", Cast.INT(user.get("role")) == 0 ? false : true);
        }

        return res;
    }


    @GetMapping("/api/users/auth")
    public ResponseEntity<Object> auth(HttpServletRequest request) {
        Map<String, Object> res = new HashMap<String, Object>();
        Map<String, Object> user = new HashMap<String, Object>();
        List<Map<String, Object>> carts = new ArrayList<Map<String, Object>>();

        HttpSession session = request.getSession();
        user = this.auth(session);

        if ( Cast.BOOL(user.get("isAuth")) == false ) {
            System.err.println("인증 실패");
            res.put("success", false);
            res.put("isAuth", false);
            res.put("msg", "No Session");
            return new ResponseEntity(res, HttpStatus.UNAUTHORIZED);
        }

        carts = userDao.selectCart( user );
        user.put("cart", carts);
        user.put("isAuth", true);
        user.put("isAdmin", user.get("role").equals(0) ? false : true); /*role => number equals?*/

        user.remove(session_name);
        return new ResponseEntity(user, HttpStatus.OK);
    }


    @PostMapping("/api/users/register")
    public ResponseEntity<Object> register(@RequestBody Map req) {
        Map<String, Object> res = new HashMap<String, Object>();

        String pw = req.get("password").toString();
        String hashPw = "";
        hashPw = Md5.createMD5(pw + userPwSalt);

        req.put("hashPw", hashPw);

        int i = userDao.insertUser(req);
        if ( i == 0 ) {
            res.put("success", false);
            res.put("msg", "회원가입 실패");
            return new ResponseEntity(res, HttpStatus.OK);
        }

        res.put("success", true);
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
        String reqPassword = Md5.createMD5(req.get("password").toString() + userPwSalt);

        req.put("email", reqEmail);
        req.put("hashPw", reqPassword);

        user = userDao.selectUserForLogin(req);
        if ( user == null ) {
            res.put("loginSuccess", false);
            res.put("msg", "로그인 실패, 존재하지 않는 계정");
            return new ResponseEntity(res, HttpStatus.BAD_REQUEST);
        }

        String userEmail = (String)user.get("email");
        String userPw = (String)user.get("password");

        if ( userEmail.equals(reqEmail) ) {
            if ( userPw.equals(reqPassword) ) {
                /* 로그인 성공 시 세션 생성 */
                String hashStr = Md5.createMD5(reqEmail + salt + reqPassword + date.toString());
                session.setAttribute(session_name, hashStr);

                sess.put("userId", user.get("userId"));
                sess.put(session_name, hashStr);
                sess.put("sessionExp", 30); // 30분 후 session 파기

                int i = userDao.insertSession(sess); // SESSION INSERT
                System.err.println("insertSession 결과 : " + i);
                if ( i == 0 ) {
                    res.put("loginSuccess", false);
                    return new ResponseEntity(res, HttpStatus.BAD_REQUEST);
                }

                res.put("loginSuccess", true);
                return new ResponseEntity(res, HttpStatus.OK);
            } else {
                res.put("loginSuccess", false);
                res.put("msg", "로그인 실패, 패스워스 확인");
                return new ResponseEntity(res, HttpStatus.BAD_REQUEST);
            }
        } else {
            res.put("loginSuccess", false);
            res.put("msg", "로그인 실패, 존재하지 않는 이메일");
            return new ResponseEntity(res, HttpStatus.BAD_REQUEST);
        }


    }


    @GetMapping("/api/users/logout")
    public ResponseEntity<Object> logout(HttpServletRequest request) {
        Map<String, Object> res = new HashMap<String, Object>();
        Map<String, Object> user = new HashMap<String, Object>();
        HttpSession session = request.getSession();

        user = this.auth(session);

        if ( Cast.BOOL(user.get("isAuth")) == false ) {
            System.err.println("인증 실패");
            res.put("success", false);
            res.put("msg", "No Session");
            return new ResponseEntity(res, HttpStatus.UNAUTHORIZED);
        }

        session.invalidate();
        int d = userDao.deleteSession(user);
        if ( d == 0 ) {
            res.put("success", false);
            return new ResponseEntity(res, HttpStatus.UNAUTHORIZED);
        }

        res.put("success", true);
        return new ResponseEntity(res, HttpStatus.OK);
    }


    @PostMapping("/api/users/addToCart")
    public ResponseEntity<Object> addToCart(HttpServletRequest request, @RequestBody Map req) {
        Map<String, Object> res = new HashMap<String, Object>();
        Map<String, Object> user = new HashMap<String, Object>();
        List<Map<String, Object>> carts = new ArrayList<Map<String, Object>>();
        Map<String, Object> addItem = new HashMap<String, Object>();
        HttpSession session = request.getSession();

//        System.err.println("addItem == null");
//        System.err.println(addItem == null); // false
//        System.err.println(addItem.size()); // 0

        user = this.auth(session);

        if ( Cast.BOOL(user.get("isAuth")) == false ) {
            System.err.println("인증 실패");
            res.put("success", false);
            res.put("msg", "No Session");
            return new ResponseEntity(res, HttpStatus.UNAUTHORIZED);
        }

        /* Add to Cart */
        int quantity = 0;
        int productId = Cast.INT(req.get("productId"));
        addItem.put("userId", Cast.INT(user.get("userId")));
        addItem.put("productId", productId);

        carts = userDao.selectCart(addItem);

        /* 카트에 이미 담겼는지 체크 */
        if ( carts.size() > 0 ) {
            Map<String, Object> cart = carts.get(0);
            quantity = Cast.INT(cart.get("quantity")) + 1;
            addItem.put("quantity", quantity);
            addItem.put("cartId", Cast.INT(cart.get("cartId")));
            // UPDATE
            int u = userDao.updateCart(addItem);
            if ( u == 0 ) {
                res.put("success", false);
                return new ResponseEntity(res, HttpStatus.SERVICE_UNAVAILABLE);
            }
        } else {
            quantity = 1;
            addItem.put("quantity", quantity);
            // INSERT
            int i = userDao.insertCart(addItem);
            if ( i == 0 ) {
                res.put("success", false);
                return new ResponseEntity(res, HttpStatus.SERVICE_UNAVAILABLE);
            }
        }

        return new ResponseEntity(addItem, HttpStatus.OK);
    }


    @GetMapping("/api/users/removeFromCart")
    public ResponseEntity<Object> removeFromCart(HttpServletRequest request, @RequestParam int id) {
        Map<String, Object> res = new HashMap<String, Object>();
        Map<String, Object> user = new HashMap<String, Object>();
        Map<String, Object> delItem = new HashMap<String, Object>();
        List<Map<String, Object>> cartProduct = new ArrayList<Map<String, Object>>();
        HttpSession session = request.getSession();

        user = this.auth(session);

        if ( Cast.BOOL(user.get("isAuth")) == false ) {
            System.err.println("인증 실패");
            res.put("success", false);
            res.put("msg", "No Session");
            return new ResponseEntity(res, HttpStatus.UNAUTHORIZED);
        }

        /* 카트에서 삭제 */
        delItem.put("userId", Cast.INT(user.get("userId")));
        delItem.put("productId", id);
        int d = userDao.deleteCart(delItem);
        if ( d == 0 ) {
            res.put("success", false);
            res.put("msg", "카트에 없는 상품입니다.");
            return new ResponseEntity(res, HttpStatus.BAD_REQUEST);
        }

        cartProduct = userDao.selectCartProduct(user);
        res.put("cartProduct", cartProduct);
        res.put("success", true);
        return new ResponseEntity(res, HttpStatus.OK);
    }


//    @GetMapping("/api/users/")
//    public ResponseEntity<Object> logout(HttpServletRequest request) {
//        Map<String, Object> res = new HashMap<String, Object>();
//        Map<String, Object> user = new HashMap<String, Object>();
//        HttpSession session = request.getSession();
//
//        user = this.auth(session);

//        if ( Cast.BOOL(user.get("isAuth")) == false ) {
//            System.err.println("인증 실패");
//            res.put("success", false);
//            res.put("msg", "No Session");
//            return new ResponseEntity(res, HttpStatus.UNAUTHORIZED);
//        }
//
//        return new ResponseEntity(res, HttpStatus.OK);
//    }



}