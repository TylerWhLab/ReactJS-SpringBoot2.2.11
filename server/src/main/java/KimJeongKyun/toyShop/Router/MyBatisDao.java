package KimJeongKyun.toyShop.Router;

import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface MyBatisDao {
    List<MyBatisModel> selectUser();
    List<MyBatisModel> selectUser1(int idx);
}
