package com.hgbaodev.backend.service;

import com.hgbaodev.backend.model.Member;
import org.springframework.data.domain.Page;


public interface MemberService {
    Member addMember(Member member);
    Member updateMember(Member member);
    void deleteMember(Integer memberID);
    Member getMemberById(Integer memberID);
    Page<Member> getAllMembers(int page, int size, String keyword, Integer userID);
}