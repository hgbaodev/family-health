package com.hgbaodev.backend.mapper;

import com.hgbaodev.backend.dto.response.MemberResponse;
import com.hgbaodev.backend.model.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    @Mapping(source = "memberID", target = "memberID")
    @Mapping(source = "user.id", target = "user.id")
    @Mapping(source = "user.firstname", target = "user.firstName")
    @Mapping(source = "user.lastname", target = "user.lastName")
    MemberResponse toMemberResponse(Member member);

    default Page<MemberResponse> toMembersResponse(Page<Member> members) {
        return members.map(this::toMemberResponse);
    }

    default List<MemberResponse> toMembersList(List<Member> members) {
        return members.stream()
                .map(this::toMemberResponse)
                .collect(Collectors.toList());
    }
}