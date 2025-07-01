package com.empresa.demo.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class RequestException extends RuntimeException {
    private HttpStatus httpStatus;

     public RequestException(String message, HttpStatus status){
        super(message);
        this.httpStatus=status;
    }
}
