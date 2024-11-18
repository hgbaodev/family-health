package com.hgbaodev.backend.service.impl;

import com.hgbaodev.backend.mapper.MemberMapper;
import com.hgbaodev.backend.model.Member;
import com.hgbaodev.backend.repository.MemberRepository;
import com.hgbaodev.backend.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;

    @Override
    public Member addMember(Member member) {
        return memberRepository.save(member);
    }

    @Override
    public Member updateMember(Member member) {
        Member check = memberRepository.findById(member.getMemberID())
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));
        member.setUser(check.getUser());
        return memberRepository.save(member);
    }

    @Override
    public void deleteMember(Integer memberID) {
        memberRepository.deleteById(memberID);
    }

    @Override
    public Member getMemberById(Integer memberID) {
        return memberRepository.findById(memberID)
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));
    }

    @Override
    public Page<Member> getAllMembers(int page, int size, String keyword, Integer userID) {
        Pageable pageable = PageRequest.of(page - 1, size);
        if (keyword != null && !keyword.isEmpty()) {
            return memberRepository.findByKeyword(keyword, pageable, userID);
        }
        return memberRepository.findAllByUserID(pageable, userID);
    }

    @Override
    public List<Member> getAllMembersByUserID(Integer userID) {
        return memberRepository.findAllByUserID(userID);
    }

}
