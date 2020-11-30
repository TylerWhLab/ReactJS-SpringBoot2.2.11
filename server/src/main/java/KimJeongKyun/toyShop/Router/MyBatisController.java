package KimJeongKyun.toyShop.Router;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;


@RestController
public class MyBatisController {
    @Autowired
    MyBatisDao myBatisDao;

    /*
    @GetMapping("/users")
    public ResponseEntity<Object> selectAllUsers() {
        return new ResponseEntity(users, HttpStatus.OK);
    }

    (@RequestBody List<Map> requests)
    */


    @GetMapping("/mybatis")
    public List<MyBatisModel> selectUser() throws Exception {
        List<MyBatisModel> result = myBatisDao.selectUser();
        return result;
    }

    @GetMapping("/mybatis/{idx}")
    public List<MyBatisModel> selectUser1(@PathVariable int idx) throws Exception {
        List<MyBatisModel> result = myBatisDao.selectUser1(idx);
        return result;
    }

    /*
    insert
    // response - 단순 200OK가 아닌 Location header에 생성된 id 담아 전달 & 201 created
        URI location = ServletUriComponentsBuilder.fromCurrentRequest() // 현재 request에 담음
                .path("/{id}") // 현재 request인 /jpa/users 뒤에 붙일 내용
                .buildAndExpand(savedUser.getId()) // /jpa/users 뒤에 붙일 값
                .toUri(); // http://localhost:8800/jpa/users/1 uri 형식으로 변환

        return ResponseEntity.created(location).build(); // 201 created 로 response
     */

    /*
        @GetMapping("/users/{user_id}")
        public EntityModel<User> selectUser(@PathVariable int user_id) {
            Optional<User> user = userRepository.findById(user_id);

            if (!user.isPresent()) { // 조회된 데이터가 존재하지 않는다면
                throw new UserNotFoundException(String.format("ID[%s] not found", user_id));
            }

             Hateoas
                spring boot 2.1 Resource, ControllerLinkBuilder
                spring boot 2.2 EntityModel, WebMvcLinkBuilder

        EntityModel<User> entityModel = new EntityModel<>(user.get()); // user.get() 하면 Optional data로 변환
        WebMvcLinkBuilder linkTo = linkTo(methodOn(this.getClass()).selectAllUsers());
            entityModel.add(linkTo.withRel("all-users"));
        // selectAllUsers() 메서드를 실행하기 위한 URI 를 all-users 라는 key 의 value 로 넣는다.
        // 연계 작업(조회 후 수정/삭제)에 대한 링크를 Response 하기 위해 사용
        // api client 에게 추가적으로 사용할 수 있는 api 정보를 담을 수 있다.

        // 아래처럼 response data 와 함께 추가적인 api정보를 담는다.
            {
                "id": 1,
                "name": "webwh1",
                "joinDate": "2020-11-23T19:59:38.876+0000",
                "pw": "pw1",
                "ssn": "123456-1234567",
                "links": [
                        {
                            "rel": "all-users",
                            "href": "http://localhost:8800/users"
                        }
                ]
            }

            return entityModel;
            // return user.get();
    }
     */

}
