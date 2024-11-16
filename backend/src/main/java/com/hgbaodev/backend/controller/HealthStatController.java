    package com.hgbaodev.backend.controller;

    import com.hgbaodev.backend.model.HealthStat;
    import com.hgbaodev.backend.model.Member;
    import com.hgbaodev.backend.model.User;
    import com.hgbaodev.backend.dto.request.healthStat.AddHealthStatRequest;
    import com.hgbaodev.backend.dto.request.healthStat.UpdateHealthStatRequest;
    import com.hgbaodev.backend.dto.response.ApiResponse;
    import com.hgbaodev.backend.service.AuthenticationService;
    import com.hgbaodev.backend.service.HealthStatService;
    import com.hgbaodev.backend.service.MemberService;
    import jakarta.validation.Valid;
    import lombok.RequiredArgsConstructor;
    import lombok.extern.slf4j.Slf4j;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;

    @RestController
    @RequestMapping("/api/v1/health-stats")
    @RequiredArgsConstructor
    @Slf4j
    public class HealthStatController {

        private final AuthenticationService authenticationService;
        private final HealthStatService healthStatService;
        private final MemberService memberService;

        @PostMapping
        public ResponseEntity<ApiResponse<?>> addHealthStat
                (@Valid @RequestBody AddHealthStatRequest addHealthStatRequest) {
            if(memberService.getMemberById(addHealthStatRequest.getMemberID()) == null) {
                ApiResponse<Member> response = new ApiResponse<>(
                        HttpStatus.NOT_FOUND.value(),
                        "Member not found",
                        null
                );
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
            HealthStat healthStat = HealthStat.builder()
                    .memberID(addHealthStatRequest.getMemberID())
                    .statType(addHealthStatRequest.getStatType())
                    .statValue(addHealthStatRequest.getStatValue())
                    .date(addHealthStatRequest.getDate())
                    .build();
            HealthStat addHealthStat = healthStatService.addHealthStat(healthStat);
            ApiResponse<HealthStat> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Add health stat successfully",
                    addHealthStat
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        @PutMapping("/{id}")
        public ResponseEntity<ApiResponse<?>> updateVaccination(
                @PathVariable("id") Integer id,
                @Valid @RequestBody UpdateHealthStatRequest updateHealthStatRequest) {
            HealthStat healthStat = HealthStat.builder()
                    .statID(id)
                    .statType(updateHealthStatRequest.getStatType())
                    .statValue(updateHealthStatRequest.getStatValue())
                    .date(updateHealthStatRequest.getDate())
                    .build();
            HealthStat updateHealthStat = healthStatService.updateHealthStat(healthStat);
            ApiResponse<HealthStat> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Update vaccination successfully",
                    updateHealthStat
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteHealthStat(@PathVariable("id") Integer id) {
            healthStatService.deleteHealthStat(id);
            return ResponseEntity.noContent().build();
        }

        @GetMapping("/{id}")
        public ResponseEntity<ApiResponse<?>> getHealthStatById(@PathVariable("id") Integer id) {
            HealthStat healthStat = healthStatService.getHealthStatById(id);
            ApiResponse<HealthStat> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Get health status successfully",
                    healthStat
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        @GetMapping
        public ResponseEntity<ApiResponse<List<HealthStat>>> getAllHealthStatsByStatType(
                @RequestParam(defaultValue = "") Integer selectedMemberId,
                @RequestParam(defaultValue = "") String selectedStatType,
                @RequestParam(defaultValue = "") String date) {

            List<HealthStat>  healthStatList = healthStatService.getHealthStatsByStatType(selectedMemberId, selectedStatType, date);

            ApiResponse<List<HealthStat>> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Get list vaccination successfully",
                    healthStatList
            );

            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        @GetMapping("/membersSelect")
        public ResponseEntity<ApiResponse<List<Member>>> getAllMembers() {
            User user = authenticationService.getCurrentUser();
            List<Member> membersList = memberService.getAllMembersByUserID(user.getId());

            ApiResponse<List<Member>> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Get list member successfully",
                    membersList
            );

            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        @GetMapping("/displayChart")
        public ResponseEntity<ApiResponse<List<HealthStat>>> getHealthStatsToDisplayChart(
                @RequestParam(defaultValue = "") Integer selectedMemberId,
                @RequestParam(defaultValue = "") String selectedStatType,
                @RequestParam(defaultValue = "") String date) {

            List<HealthStat>  healthStatList = healthStatService.getHealthStatsToDisplayChart(selectedMemberId, selectedStatType, date);

            ApiResponse<List<HealthStat>> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Get list vaccination successfully",
                    healthStatList
            );

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }
