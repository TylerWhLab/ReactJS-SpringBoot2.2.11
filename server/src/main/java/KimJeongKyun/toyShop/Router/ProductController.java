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
public class ProductController {

    @Autowired
    ProductDao productDao;


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