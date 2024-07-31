package com.Coupons_Project.Controller;

import com.Coupons_Project.Utils.JWT;
import com.Coupons_Project.beans.Credentials;
import com.Coupons_Project.beans.UserDetails;
import com.Coupons_Project.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin()
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService usersService;
    private final JWT jwt;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Credentials user) throws Exception {
        HttpHeaders headers = new HttpHeaders();
        UserDetails userDetails = usersService.loginUser(user);
        headers.set("Authorization", "Bearer " + jwt.generateToken(userDetails));
        return new ResponseEntity<>(true, headers, HttpStatus.OK);
    }
}