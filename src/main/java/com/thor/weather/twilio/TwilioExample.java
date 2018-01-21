package com.thor.weather.twilio;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

public class TwilioExample {

	  // Find your Account Sid and Token at twilio.com/user/account
	  public static final String ACCOUNT_SID = "AC109fd5802f1a2eddb783f16571657fb2";
	  public static final String AUTH_TOKEN = "5ceb76e02a7cc2caa7931fe852cec57d";

	  public static void twilioTest() {
	    Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

	    Message message = Message.creator(new PhoneNumber("+447769330521"),
	        new PhoneNumber("+441270260308"), 
	        "Hello from weather app!").create();
	    System.out.println(message.getSid());
        
	  }
	  
	  public static String broadcastWeather(String phoneNumber) {
		    Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
		    String forecast = "Tomorrows Weather in Shuzenji: Overcast Clouds, Min: 13.89 C, Max: 18.89 C, Rain: 0 mm";
		    
		    for(String num : phoneNumber.split(",")) {
			    	Message message = Message.creator(new PhoneNumber(num),
					        new PhoneNumber("+441270260308"), 
					        forecast).create();
					    String sid = message.getSid();
						System.out.println(sid);
						Message messageFromLog = Message.fetcher(sid).fetch();
				        String body = messageFromLog.getBody();
						System.out.println(body + " | TO: " + num);
		    }

			return forecast;
	        
		  }
	  
}
