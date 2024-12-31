package com.truongbuii.food_delivery.exception;

import com.truongbuii.food_delivery.model.common.Constant;
import com.truongbuii.food_delivery.model.response.ApiResponse;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({Exception.class})
    public ResponseEntity<ApiResponse<?>> handleException(Exception e) {
        ApiResponse<?> apiResponse = ApiResponse.builder()
                .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .message(e.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(apiResponse);
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<ApiResponse<?>> handleException(MethodArgumentNotValidException e) {
        String message = e.getBindingResult().getAllErrors().getFirst().getDefaultMessage();
        ApiResponse<?> apiResponse = ApiResponse.builder()
                .code(HttpStatus.BAD_REQUEST.value())
                .message(message)
                .build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiResponse);
    }

    @ExceptionHandler({BadCredentialsException.class})
    public ResponseEntity<ApiResponse<?>> handleException(BadCredentialsException e) {
        ApiResponse<?> apiResponse = ApiResponse.builder()
                .code(HttpStatus.BAD_REQUEST.value())
                .message(Constant.ErrorCode.ERR_USER_INVALID_CREDENTIALS)
                .build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiResponse);
    }

    @ExceptionHandler({ResourceNotFoundException.class})
    public ResponseEntity<ApiResponse<?>> handleException(ResourceNotFoundException e) {
        ApiResponse<?> apiResponse = ApiResponse.builder()
                .code(HttpStatus.NOT_FOUND.value())
                .message(e.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiResponse);
    }

    @ExceptionHandler({DuplicateResourceException.class})
    public ResponseEntity<ApiResponse<?>> handleException(DuplicateResourceException e) {
        ApiResponse<?> apiResponse = ApiResponse.builder()
                .code(HttpStatus.CONFLICT.value())
                .message(e.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.CONFLICT).body(apiResponse);
    }

    @ExceptionHandler({InvalidTokenException.class})
    public ResponseEntity<ApiResponse<?>> handleException(InvalidTokenException e) {
        ApiResponse<?> apiResponse = ApiResponse.builder()
                .code(HttpStatus.UNAUTHORIZED.value())
                .message(e.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(apiResponse);
    }

    @ExceptionHandler({InvalidOtpException.class})
    public ResponseEntity<ApiResponse<?>> handleException(InvalidOtpException e) {
        ApiResponse<?> apiResponse = ApiResponse.builder()
                .code(HttpStatus.BAD_REQUEST.value())
                .message(e.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(apiResponse);
    }

}