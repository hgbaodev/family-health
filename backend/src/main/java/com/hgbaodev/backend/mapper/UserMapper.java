package com.hgbaodev.backend.mapper;

import com.hgbaodev.backend.dto.request.auth.RegisterRequest;
import com.hgbaodev.backend.dto.response.UserResponse;
import com.hgbaodev.backend.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(target = "is_verify", source = "_verify")
    @Mapping(target = "is_block", source = "_block")
    @Mapping(target = "date", source = "date")
    UserResponse toUserResponse(User user);

    User toUser(RegisterRequest request);

    default Page<UserResponse> toUsersResponse(Page<User> users) {
        return users.map(this::toUserResponse);
    }
}

