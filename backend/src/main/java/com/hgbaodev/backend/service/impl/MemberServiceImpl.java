package com.hgbaodev.backend.service.impl;

import com.hgbaodev.backend.model.Member;
import com.hgbaodev.backend.repository.MemberRepository;
import com.hgbaodev.backend.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public Member addMember(Member member) {
        return memberRepository.save(member);
    }

    @Override
    public Member updateMember(Member member) {
        if (memberRepository.existsById(member.getMemberID())) {
            return memberRepository.save(member);
        } else {
            throw new IllegalArgumentException("Member not found");
        }
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
    public Page<Member> getAllMembers(int page, int size, String keyword) {
        Pageable pageable = PageRequest.of(page - 1, size);  // page is 0-based
        if (keyword != null && !keyword.isEmpty()) {
            return memberRepository.findByKeyword(keyword, pageable);
        }
        return memberRepository.findAll(pageable);  // Use pageable for pagination
    }

}
