package com.thor.weather.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.thor.weather.twilio.TwilioExample;

@RestController
public class TestController {
	
	@RequestMapping("/hit-test")
	public String testRest() {
		return "You hit the endpoint! Ouch!";
	}
	
	@RequestMapping("/twilio-test")
	public String testTwilio() {
		TwilioExample.twilioTest();
		return "You hit the endpoint! Ouch!";
	}
	
	@RequestMapping("/broadcast-weather")
	public String broadcastWeather(@RequestParam("phone") String phone) {
		String broadcastWeather = TwilioExample.broadcastWeather(phone);
		return "Weather forecast \"" + broadcastWeather + "\" sent to " + phone;
	}

}
