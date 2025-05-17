package com.example.demo.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class FakeService {

    private final Random random = new Random();

    private final List<byte[]> memoryLeaker = new ArrayList<>();

    public String heavyProcessing() {
        // allocate some memory temporarily to simulate work
        byte[] payload = new byte[1024 * 1024 * (1 + random.nextInt(4))]; // 1‑4 MB
        for (int i = 0; i < payload.length; i++) {
            payload[i] = (byte) (i % 256);
        }
        memoryLeaker.add(new byte[10 * 1024 * 1024]); // 10 MB por llamada
        return "processed " + payload.length + " bytes";
    }
}
