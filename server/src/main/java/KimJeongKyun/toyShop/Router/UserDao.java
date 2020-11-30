package KimJeongKyun.toyShop.Router;

import org.apache.ibatis.annotations.Mapper;

import java.math.BigDecimal;
import java.util.*;

@Mapper
public interface UserDao {
    Map selectUserForLogin(Map req); // 로그인
    int insertSession(Map session); // 세션 insert
    Map selectUserSession(Map req);
    int deleteSession(Map session);
    List<Map<String, Object>> selectCart(Map user_id);
}
