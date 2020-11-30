package KimJeongKyun.toyShop.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String msg) {
        super(msg);
    }
}

/*
* 2XX : OK
* 3XX : Redirect
* 4XX : Client Err
* 5XX : Server Err - 프로그램, 외부 자원 연결 오류
* */