package com.hgbaodev.backend.mapper;

import com.hgbaodev.backend.dto.request.member.AddMemberRequest;
import com.hgbaodev.backend.dto.request.member.UpdateMemberRequest;
import com.hgbaodev.backend.dto.response.MemberResponse;
import com.hgbaodev.backend.model.Member;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    MemberMapper INSTANCE = Mappers.getMapper(MemberMapper.class);

    MemberResponse toMemberResponse(Member member);

    Member toMember(AddMemberRequest addMemberRequest);

    Member toMember(UpdateMemberRequest updateMemberRequest);

    default Page<MemberResponse> toMembersResponse(Page<Member> members) {
        return members.map(this::toMemberResponse);
    }

    default List<MemberResponse> toMembersList(List<Member> members) {
        return members.stream()
                .map(this::toMemberResponse)
                .collect(Collectors.toList());
    }
}