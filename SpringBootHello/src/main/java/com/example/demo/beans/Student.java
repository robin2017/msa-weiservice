package com.example.demo.beans;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Created by robin on 2017/9/7.
 */
@Component
public class Student {
    @Value("robin")
    String name;
    @Value("24")
    String age;
}
