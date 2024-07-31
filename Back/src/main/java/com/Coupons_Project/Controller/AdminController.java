package com.Coupons_Project.Controller;

import com.Coupons_Project.services.AdminService;
import com.Coupons_Project.Utils.JWT;
import com.Coupons_Project.beans.Company;
import com.Coupons_Project.beans.Customer;
import com.Coupons_Project.beans.UserLogin;
import com.Coupons_Project.exceptions.AdminExceptions.AdminSystemException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
@CrossOrigin
public class AdminController {
    private final JWT jwtUtil;
    private final AdminService adminService;

    @PostMapping("/adminLogin/{email}/{password}")
    @ResponseStatus(HttpStatus.OK)
    public boolean adminLogin(@RequestHeader("Authorization") String jwt, @RequestBody UserLogin data) throws AdminSystemException {
        return adminService.adminLogin(data.getEmail(), data.getUserPass());
    }


    @PostMapping("/addCompany")
    public ResponseEntity<?> addCompany(@RequestHeader("Authorization") String jwt, @RequestBody Company company) throws Exception {
        System.out.println(jwt);
            return new ResponseEntity<>(adminService.addCompany(company),jwtUtil.CheckTheJWT(jwt), HttpStatus.CREATED);
    }



    @PutMapping("/updateCompany")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> updateCompany(@RequestHeader("Authorization") String jwt, @RequestBody Company company)
            throws Exception {
        return new ResponseEntity<>(adminService.updateCompany(company), jwtUtil.CheckTheJWT(jwt), HttpStatus.OK);
    }


    @DeleteMapping("/deleteCompany/{id}")
    public ResponseEntity<?> deleteCompany(@RequestHeader("Authorization") String jwt, @PathVariable int id)
            throws Exception {
        return new ResponseEntity<>(adminService.deleteCompany(id), jwtUtil.CheckTheJWT(jwt), HttpStatus.ACCEPTED);
    }


    @GetMapping("/allCompanies")
    public ResponseEntity<?> getAllCompanies(@RequestHeader("Authorization") String jwt) throws Exception {
        return new ResponseEntity<>(adminService.getAllCompanies(), jwtUtil.CheckTheJWT(jwt), HttpStatus.OK);
    }


    @GetMapping("/singleCompany/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getSingleCompany(@RequestHeader("Authorization") String jwt, @PathVariable int id)
            throws Exception {
        return new ResponseEntity<>(adminService.getSingleCompany(id), jwtUtil.CheckTheJWT(jwt), HttpStatus.OK);

    }

    @PostMapping("/addCustomer")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> addCustomer(@RequestHeader("Authorization") String jwt, @RequestBody Customer customer)
            throws Exception {
        return new ResponseEntity<>(adminService.addCustomer(customer), jwtUtil.CheckTheJWT(jwt), HttpStatus.OK);

    }

    @PutMapping("/updateCustomer")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> updateCustomer(@RequestHeader("Authorization") String jwt, @RequestBody Customer customer)
            throws Exception {
        return new ResponseEntity<>(adminService.updateCustomer(customer), jwtUtil.CheckTheJWT(jwt), HttpStatus.OK);
    }

    @DeleteMapping("/deleteCustomer/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<?> deleteCustomer(@RequestHeader("Authorization") String jwt, @PathVariable int id)
            throws Exception {
        return new ResponseEntity<>(adminService.deleteCustomer(id), jwtUtil.CheckTheJWT(jwt), HttpStatus.OK);
    }

    @GetMapping("/allCustomers")
    public ResponseEntity<?> getAllCustomers(@RequestHeader("Authorization") String jwt) throws Exception {
        return new ResponseEntity<>(adminService.getAllCustomers(), jwtUtil.CheckTheJWT(jwt), HttpStatus.OK);
    }

    @GetMapping("/singleCustomer/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getSingleCustomer(@RequestHeader("Authorization") String jwt, @PathVariable int id)
            throws Exception {
        return new ResponseEntity<>(adminService.getSingleCustomer(id), jwtUtil.CheckTheJWT(jwt), HttpStatus.OK);
    }
}