/**
 * @author Vivek Kumar Ghosh
 *
 */
package com.stagingstackmanagement.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ApplicationController {
	@GetMapping(path="/")
	@ResponseBody
	public void home() {
		System.out.println("Home");
	}
}
