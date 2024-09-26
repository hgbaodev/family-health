package com.hgbaodev.backend.service;

import com.hgbaodev.backend.model.Member;

import java.util.List;

public interface MemberService {
    Member addMember(Member member);
    Member updateMember(Member member);
    void deleteMember(Integer memberID);
    Member getMemberById(Integer memberID);
    List<Member> getAllMembers();
}
