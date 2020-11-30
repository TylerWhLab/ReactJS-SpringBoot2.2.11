package KimJeongKyun.toyShop.Router;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.NClob;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MyBatisModel {
    private Integer idx;
    private String title;
    private String content;
    private String writer;
    private String password;
    private String secret;
    private String date;
}
