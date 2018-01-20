package com.thor.weather.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
	
	@RequestMapping("/hit-test")
	public String testRest() {
		return "You hit the endpoint! Ouch!";
	}

}
