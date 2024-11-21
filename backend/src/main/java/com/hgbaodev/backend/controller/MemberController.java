    package com.hgbaodev.backend.controller;

    import com.hgbaodev.backend.dto.response.MemberResponse;
    import com.hgbaodev.backend.mapper.MemberMapper;
    import com.hgbaodev.backend.model.Member;
    import com.hgbaodev.backend.model.User;
    import com.hgbaodev.backend.dto.request.member.AddMemberRequest;
    import com.hgbaodev.backend.dto.request.member.UpdateMemberRequest;
    import com.hgbaodev.backend.dto.response.ApiResponse;
    import com.hgbaodev.backend.service.AuthenticationService;
    import com.hgbaodev.backend.service.MemberService;
    import com.hgbaodev.backend.utils.CustomPagination;
    import jakarta.validation.Valid;
    import lombok.RequiredArgsConstructor;
    import lombok.extern.slf4j.Slf4j;
    import org.springframework.data.domain.Page;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;

    @RestController
    @RequestMapping("/api/v1/members")
    @RequiredArgsConstructor
    @Slf4j
    public class MemberController {

        private final MemberService memberService;
        private final AuthenticationService authenticationService;
        private final MemberMapper memberMapper;

        @PostMapping
        public ResponseEntity<ApiResponse<?>> addMember(@Valid @RequestBody AddMemberRequest addMemberRequest) {
            User user = authenticationService.getCurrentUser();
            Member member = MemberMapper.INSTANCE.toMember(addMemberRequest);
            member.setUser(user);
            Member createdMember = memberService.addMember(member);
            ApiResponse<Member> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Add member successfully",
                    createdMember
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        @PutMapping("/{id}")
        public ResponseEntity<ApiResponse<?>> updateMember(
                @PathVariable("id") Integer id,
                @Valid @RequestBody UpdateMemberRequest updateMemberRequest) {
            Member member = MemberMapper.INSTANCE.toMember(updateMemberRequest);
            member.setId(id);
            Member updatedMember = memberService.updateMember(member);
            ApiResponse<Member> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Update member successfully",
                    updatedMember
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
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
        public ResponseEntity<ApiResponse<CustomPagination<MemberResponse>>> getAllMembers(
                @RequestParam(defaultValue = "1") int page,
                @RequestParam(defaultValue = "8") int size,
                @RequestParam(defaultValue = "") String keyword) {
            User user = authenticationService.getCurrentUser();
            Page<Member> membersPage = memberService.getAllMembers(page, size, keyword, user.getId());
            Page<MemberResponse> memberResponses = memberMapper.toMembersResponse(membersPage);
            CustomPagination<MemberResponse> membersContent = new CustomPagination<>(memberResponses);
            ApiResponse<CustomPagination<MemberResponse>> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Get list member successfully",
                    membersContent
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        @GetMapping("/all")
        public ResponseEntity<ApiResponse<List<MemberResponse>>> getAllMembersByUser() {
            User user = authenticationService.getCurrentUser();
            List<Member> members = memberService.getAllMembersByUserID(user.getId());
            List<MemberResponse> memberResponses = memberMapper.toMembersList(members);
            ApiResponse<List<MemberResponse>> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Get list member successfully",
                    memberResponses
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }
