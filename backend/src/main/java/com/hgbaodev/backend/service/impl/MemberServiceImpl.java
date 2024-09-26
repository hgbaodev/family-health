package com.hgbaodev.backend.service.impl;

import com.hgbaodev.backend.model.Member;
import com.hgbaodev.backend.repository.MemberRepository;
import com.hgbaodev.backend.service.MemberService;
import lombok.RequiredArgsConstructor;
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
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }
}
