package com.hgbaodev.backend.controller;

import com.hgbaodev.backend.model.Member;
import com.hgbaodev.backend.model.User;
import com.hgbaodev.backend.request.member.AddMemberRequest;
import com.hgbaodev.backend.response.ApiResponse;
import com.hgbaodev.backend.response.AuthenticationResponse;
import com.hgbaodev.backend.service.AuthenticationService;
import com.hgbaodev.backend.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
@Slf4j
public class MemberController {

    private final MemberService memberService;
    private final AuthenticationService authenticationService;

    @PostMapping
    public ResponseEntity<ApiResponse<?>> addMember(@Valid @RequestBody AddMemberRequest addMemberRequest) {
        User user = authenticationService.getCurrentUser();
        Member member = Member.builder()
                .userID(user.getId())
                .fullName(addMemberRequest.getFullName())
                .dateOfBirth(addMemberRequest.getDateOfBirth())
                .gender(addMemberRequest.getGender())
                .relationship(addMemberRequest.getRelationship())
                .bloodType(addMemberRequest.getBloodType())
                .height(addMemberRequest.getHeight())
                .weight(addMemberRequest.getWeight())
                .build();
        log.info(member.toString());
        Member createdMember = memberService.addMember(member);
        ApiResponse<Member> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                "Get list member successfully",
                createdMember
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Member> updateMember(@PathVariable("id") Integer id, @Validated @RequestBody Member member) {
        member.setMemberID(id);
        Member updatedMember = memberService.updateMember(member);
        return ResponseEntity.ok(updatedMember);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable("id") Integer id) {
        memberService.deleteMember(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> getMemberById(@PathVariable("id") Integer id) {
        Member member = memberService.getMemberById(id);
        ApiResponse<Member> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                "Get member successfully",
                member
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getAllMembers() {
        List<Member> members = memberService.getAllMembers();
        ApiResponse<List<Member>> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                "Get list member successfully",
                members
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
