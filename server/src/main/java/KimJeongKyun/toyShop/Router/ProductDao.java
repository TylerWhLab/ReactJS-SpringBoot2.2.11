package KimJeongKyun.toyShop.Router;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ProductDao {
    List<Map<String, Object>> selectProducts(Map req);
    List<Map<String, Object>> selectCartProducts(List productIds);
    int insertProduct(Map req);
    int insertFileInfo(Map req);

}
