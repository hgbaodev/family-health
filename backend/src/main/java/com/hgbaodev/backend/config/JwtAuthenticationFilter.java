package com.hgbaodev.backend.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hgbaodev.backend.repository.TokenRepository;
import com.hgbaodev.backend.service.JwtService;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.util.PathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtService jwtService;
  private final UserDetailsService userDetailsService;
  private final TokenRepository tokenRepository;

  // Định nghĩa các đường dẫn được phép truy cập mà không cần xác thực
  private static final String[] WHITELIST_URLS = {
          "/api/v1/auth/**",
          "/v2/api-docs",
          "/v3/api-docs/**",
          "/swagger-resources/**",
          "/configuration/ui",
          "/configuration/security",
          "/swagger-ui/**",
          "/webjars/**",
          "/swagger-ui.html",
  };

  private final PathMatcher pathMatcher = new AntPathMatcher();


  @Override
  protected void doFilterInternal(
          @NonNull HttpServletRequest request,
          @NonNull HttpServletResponse response,
          @NonNull FilterChain filterChain
  ) throws ServletException, IOException {

    String requestPath = request.getRequestURI();

    // Kiểm tra xem đường dẫn hiện tại có nằm trong whitelist không
    for (String pattern : WHITELIST_URLS) {
      if (pathMatcher.match(pattern, requestPath)) {
        filterChain.doFilter(request, response);
        return;
      }
    }

    // Xử lý JWT cho các đường dẫn không nằm trong whitelist
    final String authHeader = request.getHeader("Authorization");
    final String jwt;
    final String userEmail;

    ObjectMapper objectMapper = new ObjectMapper(); // Tạo ObjectMapper để chuyển object thành JSON

    // Nếu không có token JWT, trả về lỗi 403 với object JSON
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      response.setStatus(HttpServletResponse.SC_FORBIDDEN);
      response.setContentType("application/json");

      Map<String, String> errorResponse = new HashMap<>();
      errorResponse.put("error", "Access Denied");
      errorResponse.put("message", "Missing or invalid Authorization header.");

      response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
      return;
    }
    try {
      jwt = authHeader.substring(7);
      userEmail = jwtService.extractUsername(jwt);
    } catch (MalformedJwtException e) {
      Map<String, String> errorResponse = new HashMap<>();
      errorResponse.put("error", "Access Denied");
      errorResponse.put("message", "Invalid token.");
      response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
      return;
    } catch (SignatureException e) {
      Map<String, String> errorResponse = new HashMap<>();
      errorResponse.put("error", "Access Denied");
      errorResponse.put("message", "Invalid SignatureException.");
      response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
      return;
    } catch (Exception e) {
      Map<String, String> errorResponse = new HashMap<>();
      errorResponse.put("error", "Access Denied");
      errorResponse.put("message", "Invalid token.");
      response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
      return;
    }

    // Nếu token JWT không hợp lệ, trả về lỗi 403 với object JSON
    if (userEmail == null || SecurityContextHolder.getContext().getAuthentication() != null) {
      response.setStatus(HttpServletResponse.SC_FORBIDDEN);
      response.setContentType("application/json");

      Map<String, String> errorResponse = new HashMap<>();
      errorResponse.put("error", "Access Denied");
      errorResponse.put("message", "Invalid token.");

      response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
      return;
    }

    UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
    boolean isTokenValid = tokenRepository.findByToken(jwt)
            .map(t -> !t.isExpired() && !t.isRevoked())
            .orElse(false);

    if (jwtService.isTokenValid(jwt, userDetails) && isTokenValid) {
      UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
              userDetails,
              null,
              userDetails.getAuthorities()
      );
      authToken.setDetails(
              new WebAuthenticationDetailsSource().buildDetails(request)
      );
      SecurityContextHolder.getContext().setAuthentication(authToken);
      filterChain.doFilter(request, response);
    } else {
      // Nếu token không hợp lệ, trả về lỗi 403 với object JSON
      response.setStatus(HttpServletResponse.SC_FORBIDDEN);
      response.setContentType("application/json");

      Map<String, String> errorResponse = new HashMap<>();
      errorResponse.put("error", "Access Denied");
      errorResponse.put("message", "Token is invalid or expired.");
      response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
    }
  }

}
