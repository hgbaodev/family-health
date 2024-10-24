    package com.hgbaodev.backend.controller;

    import com.hgbaodev.backend.model.Member;
    import com.hgbaodev.backend.model.User;
    import com.hgbaodev.backend.request.member.AddMemberRequest;
    import com.hgbaodev.backend.request.member.UpdateMemberRequest;
    import com.hgbaodev.backend.response.ApiResponse;
    import com.hgbaodev.backend.service.AuthenticationService;
    import com.hgbaodev.backend.service.MemberService;
    import jakarta.validation.Valid;
    import lombok.RequiredArgsConstructor;
    import lombok.extern.slf4j.Slf4j;
    import org.springframework.data.domain.Page;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;

    @RestController
    @RequestMapping("/api/v1/appointments")
    @RequiredArgsConstructor
    @Slf4j
    public class AppointmentController {

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
                    "Add member successfully",
                    createdMember
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        @PutMapping("/{id}")
        public ResponseEntity<ApiResponse<?>> updateMember(
                @PathVariable("id") Integer id,
                @Valid @RequestBody UpdateMemberRequest updateMemberRequest) {
            Member member = Member.builder()
                    .memberID(id)
                    .fullName(updateMemberRequest.getFullName())
                    .dateOfBirth(updateMemberRequest.getDateOfBirth())
                    .gender(updateMemberRequest.getGender())
                    .relationship(updateMemberRequest.getRelationship())
                    .bloodType(updateMemberRequest.getBloodType())
                    .height(updateMemberRequest.getHeight())
                    .weight(updateMemberRequest.getWeight())
                    .build();
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
        public ResponseEntity<ApiResponse<List<Member>>> getAllMembers(
                @RequestParam(defaultValue = "1") int page,
                @RequestParam(defaultValue = "8") int size,
                @RequestParam(defaultValue = "") String keyword) {
            User user = authenticationService.getCurrentUser();
            Page<Member> membersPage = memberService.getAllMembers(page, size, keyword, user.getId());

            List<Member> membersContent = membersPage.getContent();

            ApiResponse<List<Member>> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Get list member successfully",
                    membersContent
            );

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }
