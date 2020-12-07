package KimJeongKyun.toyShop.Router;

import KimJeongKyun.toyShop.util.Cast;
import KimJeongKyun.toyShop.util.Md5;
import net.minidev.json.JSONArray;
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


    /* 상품 등록 */
    @PostMapping("/api/product")
    public ResponseEntity<Object> productRegister(@RequestBody Map req) {
        Map<String, Object> res = new HashMap<String, Object>();

        int i = productDao.insertProduct(req);
        if ( i == 0 ) {
            res.put("success", false);
            return new ResponseEntity(res, HttpStatus.BAD_REQUEST);
        }

        List<String> images = (List)req.get("images");
        String path = "/"; // domain:8080/정적파일 => 다운로드 api가 경로 찾으므로 그냥 /

        req.put("orgFileName", "");
        req.put("realFileName", "");
        req.put("path", path);

        for (String img : images) {

            req.replace("orgFileName", img);
            req.replace("realFileName", img); /* TODO 가공 */

            i = 0;
            i = productDao.insertFileInfo(req);
            if ( i == 0 ) {
                res.put("success", false);
                return new ResponseEntity(res, HttpStatus.BAD_REQUEST);
            }
        }


        res.put("success", true);
        return new ResponseEntity(res, HttpStatus.OK);
    }


    /* 상품 전체 조회 */
    @PostMapping("/api/product/products")
    public ResponseEntity<Object> selectProducts(@RequestBody Map req) {
        Map<String, Object> res = new HashMap<String, Object>();
        List<Map<String, Object>> products = new ArrayList<Map<String, Object>>();

//        String sortBy = Cast.STR(req.get("sortBy"));
//        String order = Cast.STR(req.get("order")); // ASC/DESC
//        int cntPerPage = Cast.INT(req.get("limit"));
//        int startIdx = Cast.INT(req.get("skip"));
//        String searchText = Cast.STR(req.get("searchTerm"));

        /* 검색조건 */
        if ( req.containsKey("filters") ) {
            Map filters = (Map)req.get("filters");
            if ( filters.containsKey("checkBoxData")) {
                Map checkBoxData = (Map)filters.get("checkBoxData");
                if ( !checkBoxData.isEmpty() ) {
                    req.put("sortBy", checkBoxData.get("column"));
                    req.put("order", checkBoxData.get("keyword"));
                }
            }

            if ( filters.containsKey("price") ) {
                List price = (List)filters.get("price");
                if (price.size() == 2) {
                    req.put("startPrice", price.get(0));
                    req.put("endPrice", price.get(1));
                }
            }

        }

        /* default value */
        if ( !req.containsKey("searchTerm") ) req.put("searchTerm", "");
        if ( !req.containsKey("sortBy")     ) req.put("sortBy", "PRODUCT_ID");
        if ( !req.containsKey("order")      ) req.put("order", "DESC");

        if ( !req.containsKey("startPrice") ) req.put("startPrice", "0");
        if ( !req.containsKey("endPrice")   ) req.put("endPrice", "1000000000");

        System.err.println("상품 전체 조회");
        System.err.println(req);
        products = productDao.selectProducts(req);

        // listagg to list
        for (Map prod : products) {
            String images = Cast.STR(prod.get("images"));
            String[] datas = images.split(",");
            prod.replace("images", datas);
        }

        res.put("success", true);
        res.put("productInfo", products);
        res.put("postSize", products.size());

        return new ResponseEntity(res, HttpStatus.OK);
    }


    /* 상품 상세보기 */
    @GetMapping("/api/product/products_by_id")
    public ResponseEntity<Object> selectProduct(@RequestParam List id) {
        List<Map<String, Object>> products = new ArrayList<Map<String, Object>>();

        products = productDao.selectCartProducts(id);

        System.err.println("products");
        System.err.println(products);

        // listagg to list
        for (Map prod : products) {
            String images = Cast.STR(prod.get("images"));
            String[] datas = images.split(",");
            prod.replace("images", datas);
        }

        return new ResponseEntity(products, HttpStatus.OK);
    }


}