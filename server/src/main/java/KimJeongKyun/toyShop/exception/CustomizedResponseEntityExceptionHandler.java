package KimJeongKyun.toyShop.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Date;

@RestController
@ControllerAdvice // 모든 컨트롤러가 실행되면 ControllerAdvice 선언된 빈이 실행 // 모든 예외가 이 곳에서 처리
public class CustomizedResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(Exception.class) // 이 클래스 내에서 에러 발생시 이 메서드 실행
    public final ResponseEntity<Object> handleAllExceptions(Exception ex, WebRequest request) {
        // ResponseEntity : response 객체

        ExceptionResponse exceptionResponse = new ExceptionResponse(new Date(), ex.getMessage(), request.getDescription(false));

        return new ResponseEntity(exceptionResponse, HttpStatus.INTERNAL_SERVER_ERROR); // 일반적인 500 Err

    }

    @ExceptionHandler(UserNotFoundException.class) // UserNotFoundException 실행 시 이 메서드 실행
    public final ResponseEntity<Object> handleUserNotFoundException(Exception ex, WebRequest request) {
        // ResponseEntity : response 객체

        ExceptionResponse exceptionResponse = new ExceptionResponse(new Date(), ex.getMessage(), request.getDescription(false));

        return new ResponseEntity(exceptionResponse, HttpStatus.NOT_FOUND); // 404

    }

    // validation check
    @Override // 메서드 이름 오탈자 => 에러
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {

        ExceptionResponse exceptionResponse = new ExceptionResponse(new Date(), "validation failed", ex.getBindingResult().toString());

        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

}
