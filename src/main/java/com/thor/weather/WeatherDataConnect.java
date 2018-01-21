package com.thor.weather;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.thor.weather.controller.WeatherForecast;

public class WeatherDataConnect {
	
	public WeatherForecast getWeatherData() throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		String jsonInString = "{\"data\":{\"coord\":{\"lon\":\"138.9304\",\"lat\":\"34.9719\"},\"sys\":{\"country\":\"JP\",\"sunrise\":1369769524,\"sunset\":1369821049},\"weather\":[{\"id\":804,\"main\":\"clouds\",\"description\":\"overcast clouds\",\"icon\":\"04n\"}],\"main\":{\"temp\":289.5,\"humidity\":89,\"pressure\":1013,\"temp_min\":287.04,\"temp_max\":292.04},\"wind\":{\"speed\":7.31,\"deg\":187.002},\"rain\":{\"3h\":0},\"clouds\":{\"all\":92},\"dt\":1369824698,\"id\":1851632,\"name\":\"Shuzenji\",\"cod\":200},\"id\":\"055afe6e70fa83feaf43a5e0d4b4f8151f50a877c6f5aae0be55f375a7ee39aa\"}";
		return mapper.readValue(jsonInString, WeatherForecast.class);
	}

}
