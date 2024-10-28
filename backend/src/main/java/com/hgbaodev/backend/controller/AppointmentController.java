    package com.hgbaodev.backend.controller;

    import com.hgbaodev.backend.model.Appointment;
    import com.hgbaodev.backend.model.Member;
    import com.hgbaodev.backend.model.Vaccination;
    import com.hgbaodev.backend.request.appointment.AddAppointmentRequest;
    import com.hgbaodev.backend.request.appointment.UpdateAppointmentRequest;
    import com.hgbaodev.backend.request.vaccication.AddVaccinationRequest;
    import com.hgbaodev.backend.request.vaccication.UpdateVaccinationRequest;
    import com.hgbaodev.backend.response.ApiResponse;
    import com.hgbaodev.backend.service.AppointmentService;
    import com.hgbaodev.backend.service.MemberService;
    import com.hgbaodev.backend.service.VaccinationService;
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

        private final AppointmentService appointmentService;
        private final MemberService memberService;

        @PostMapping
        public ResponseEntity<ApiResponse<?>> addAppointment(@Valid @RequestBody AddAppointmentRequest addAppointmentRequest) {
            Member member = memberService.getMemberById(addAppointmentRequest.getMemberID());
            Appointment appointment = Appointment.builder()
                    .member(member)
                    .doctor(addAppointmentRequest.getDoctor())
                    .time(addAppointmentRequest.getTime())
                    .location(addAppointmentRequest.getLocation())
                    .build();
            Appointment createdAppointment = appointmentService.addAppointment(appointment);
            ApiResponse<Appointment> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Add appointment successfully",
                    createdAppointment
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        @PutMapping("/{id}")
        public ResponseEntity<ApiResponse<?>> updateAppointment(
                @PathVariable("id") Integer id,
                @Valid @RequestBody UpdateAppointmentRequest updateAppointmentRequest) {
            Member member = memberService.getMemberById(updateAppointmentRequest.getMemberID());
            Appointment appointment = Appointment.builder()
                    .appointmentID(id)
                    .member(member)
                    .doctor(updateAppointmentRequest.getDoctor())
                    .time(updateAppointmentRequest.getTime())
                    .location(updateAppointmentRequest.getLocation())
                    .build();
            Appointment updatedAppointment = appointmentService.updateAppointment(appointment);
            ApiResponse<Appointment> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Update appointment successfully",
                    updatedAppointment
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<ApiResponse<?>> deleteAppointment(@PathVariable("id") Integer id) {
            appointmentService.deleteAppointment(id);
            ApiResponse<Appointment> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Delete appointment successfully",
                    null
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        @GetMapping("")
        public ResponseEntity<ApiResponse<?>> getAllAppointments(
                @RequestParam(name = "page", defaultValue = "1") int page,
                @RequestParam(name = "size", defaultValue = "10") int size,
                @RequestParam(name = "keyword", required = false) String keyword) {
            Page<Appointment> appointments = appointmentService.getAllAppointments(page, size, keyword);
            List<Appointment> appointmentsList = appointments.getContent();
            ApiResponse<List<Appointment>> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Get all appointments successfully",
                    appointmentsList
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

    }
