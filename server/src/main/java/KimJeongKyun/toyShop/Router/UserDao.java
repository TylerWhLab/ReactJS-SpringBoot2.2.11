package KimJeongKyun.toyShop.Router;

import org.apache.ibatis.annotations.Mapper;

import java.math.BigDecimal;
import java.util.*;

@Mapper
public interface UserDao {
    Map selectUserForLogin(Map req); // 로그인
    int insertUser(Map req);

    int insertSession(Map session); // 세션 insert
    Map selectUserSession(Map req);
    int deleteSession(Map session);

    List<Map<String, Object>> selectCart(Map user_id);
    int insertCart(Map cart);
    int updateCart(Map cart);
    int deleteCart(Map cart);

    List<Map<String, Object>> selectCartProduct(Map user_id);
}
