package com.hgbaodev.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hgbaodev.backend.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "users")
public class User implements UserDetails {

  @Id
  @GeneratedValue
  private Integer id;
  private String firstname;
  private String lastname;

  @Column(unique = true)
  private String email;
  private String password;

  @Column(name = "is_verify", nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
  private boolean is_verify;

  @Column(name = "is_block", nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
  private boolean is_block;

  @Enumerated(EnumType.STRING)
  private Role role;

  @Column(name = "date", nullable = false)
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
  private LocalDateTime date;

  @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
  @JsonIgnore
  private List<Token> tokens;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return role.getAuthorities();
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
