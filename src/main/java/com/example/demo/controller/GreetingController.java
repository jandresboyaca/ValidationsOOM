package com.example.demo.controller;

import com.example.demo.service.FakeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetingController {

    private final FakeService fakeService;

    public GreetingController(FakeService fakeService) {
        this.fakeService = fakeService;
    }

    @GetMapping("/api/hello")
    public String hello() {
        return "Hello, world! " + fakeService.heavyProcessing();
    }
}
