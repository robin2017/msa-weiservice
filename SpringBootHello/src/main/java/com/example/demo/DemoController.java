package com.example.demo;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by robin on 2017/9/7.
 */

@RestController
@RequestMapping("/")
public class DemoController {

    @RequestMapping("/demo")
    private String demo(){
        return "this is spring boot,robin";
    }
}
